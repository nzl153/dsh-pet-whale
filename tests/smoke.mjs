// 冒烟测试：在 jsdom 里加载构建产物 lib/client.js，
// 模拟官方通道挂载 apply(ctx)，喂假会话快照验证状态机与交互 DOM。
// 用法：node tests/smoke.mjs
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { JSDOM } from 'jsdom'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const code = readFileSync(join(root, 'lib', 'client.js'), 'utf8')

let failures = 0
const check = (name, ok) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
  if (!ok) failures++
}

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'http://127.0.0.1:3080/',
  pretendToBeVisual: true,
})
const { window } = dom
window.innerWidth = 1440
window.innerHeight = 900
// jsdom 不实现 matchMedia，而 readTheme 会用它探测系统深色偏好。
// 桩返回 matches:false，等价于"系统浅色"，让主题判定落到默认分支。
window.matchMedia = (query) => ({
  media: query,
  matches: false,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})
// 让默认语言固定为中文，测试文案断言才稳定。
Object.defineProperty(window.navigator, 'language', { value: 'zh-CN', configurable: true })
Object.defineProperty(window.navigator, 'languages', { value: ['zh-CN'], configurable: true })

// 官方通道契约：window.__ModuleLoader__.load 注册 factory
let handoff = null
window.__ModuleLoader__ = { load: (h) => { handoff = h } }
vm.createContext(window)
vm.runInContext(code, window)
check('bundle 注册 __ModuleLoader__', handoff !== null && handoff.id === 'pet-whale')

const exports_ = handoff.factory(() => {
  throw new Error('bundle 不应有运行时 require')
})
check('导出 apply', typeof exports_.apply === 'function')
check('导出 inject=[sessions]', Array.isArray(exports_.inject) && exports_.inject[0] === 'sessions')

// 可观察会话桩：按 dsh 0.1.5-rc.2 的真实形状搭。
// 会话快照（SessionSnapshot）在 0.1.5 里**没有** partial / runningCalls / turnEnds：
//   @deepseek-ai/dsh-api-session-controller/lib/types/client/contract/snapshot.d.ts
// 这三个字段改由会话对话视图的 ChatSnapshot.legacy 提供：
//   @deepseek-ai/dsh-client-ui-chat/lib/types/client/contract/snapshot.d.ts
// 所以这里也拆成"会话快照 + chat 投影"两处可观察对象。
let currentId = 's1'
const sessionSnap = {
  sessionId: 's1',
  running: false,
  lastAgentError: null,
  openError: null,
  queue: [],
  pendingSubmissions: [],
  openState: 'open',
  blank: false,
  removed: false,
  // 非 0.1.5 字段：0.1.5 的官方快照里没有 pending，插件按老字段兜底读，
  // 这里保留它以便继续覆盖 wait 分支。
  pending: [],
}
const legacySlice = { nodes: [], turnTimings: new Map(), turnEnds: new Map(), partial: null, runningCalls: [] }
const chatSnap = { legacy: legacySlice }
const makeObservable = (get) => {
  const subs = new Set()
  return {
    getSnapshot: get,
    subscribe: (fn) => { subs.add(fn); return () => subs.delete(fn) },
    notify: () => { for (const fn of [...subs]) fn() },
  }
}
const sessionObservable = makeObservable(() => sessionSnap)
const chatObservable = makeObservable(() => chatSnap)
/** 两处订阅一起推一次（插件同时订阅了会话快照和 chat 投影）。 */
const notify = () => { sessionObservable.notify(); chatObservable.notify() }
const ctx = {
  sessions: {
    list: makeObservable(() => ({ current: currentId, phase: 'ready', sessions: [] })),
    currentProvideInfo: makeObservable(() => undefined),
    binding: (id) => (id === currentId ? { sessionId: id, session: sessionObservable } : undefined),
    open() {},
    clear() {},
    searchResultLimit: 20,
    scope() { return undefined },
    scopeOf() { return undefined },
    sessionOf() { return undefined },
    openSubagent() {},
    subagentAddress() { return undefined },
    setSubagentCatalogOpen() {},
    refreshSubagents() { return Promise.resolve() },
    noteAgentPreset() {},
    search() { return Promise.resolve({ ok: true, value: { items: [], hasMore: false } }) },
    fork() { return Promise.reject(new Error('not used')) },
    provide() { return () => {} },
  },
  // 0.1.5 新增：会话对话视图服务（提供 chat 投影，里面就是旧快照的 partial / runningCalls / turnEnds）
  uiConversation: {
    binding: () => ({ target: () => chatObservable }),
  },
}

// apply：挂载
const dispose = exports_.apply(ctx)
check('apply 返回 disposer', typeof dispose === 'function')
const rootEl = window.document.querySelector('[data-dsh-whale]')
check('挂载 data-dsh-whale 容器', rootEl !== null)
check('注入样式', window.document.getElementById('pet-whale-style') !== null)
const pet = rootEl?.querySelector('.pet-official')
check('鲸鱼本体存在', pet !== null)
check('初始 idle 类', pet?.classList.contains('idle') === true)
check('SVG 有官方路径', (rootEl?.innerHTML.match(/M22\.9168/g) ?? []).length > 0)
const shadow = rootEl?.querySelector(':scope > .dsh-whale-shadow')
check('影子是容器兄弟元素（不随鲸鱼旋转）', shadow !== null)
check('影子不在鲸鱼内部', pet?.querySelector('.dsh-whale-shadow') === null)

const classesOf = () => [...(pet?.classList ?? [])].filter((c) => ['idle', 'think', 'working', 'celebrate', 'error', 'wait'].includes(c)).join(',')

// 状态机：think（文本流，先于 working 测，避免粘滞窗口干扰）
sessionSnap.running = true
legacySlice.partial = { turn: 1, step: 1, blocks: [] }
notify()
check('文本流 → think', classesOf() === 'think')

// 状态机：回合中无文字流无工具 → think（不回 idle）
legacySlice.partial = null
notify()
check('回合中空档 → think', classesOf() === 'think')

// 状态机：working（工具调用，runningCalls 现在从 chat 投影读）
legacySlice.runningCalls = [{ callId: 'c1', name: 'bash', turn: 1, step: 1 }]
notify()
check('工具调用 → working', classesOf() === 'working')

// 状态机：有 pending 等待用户处理 → wait
// （0.1.5 的会话快照没有 pending，也没有替代的公开读取面；插件按老字段兜底读，
//  所以这里仍然能覆盖这一分支）
legacySlice.runningCalls = []
sessionSnap.pending = [{ kind: 'approval' }]
notify()
check('有 pending → wait', classesOf() === 'wait')
sessionSnap.pending = []
notify()
check('pending 清空回到底态', classesOf() === 'think' || classesOf() === 'working')

// 回归：0.1.5 的纯 SessionSnapshot（没有 partial / runningCalls / turnEnds / pending）
// 绝不能让订阅回调抛错 —— 正是 "Cannot read properties of undefined (reading 'length')"
// 把整条快照链打断、鲸鱼从此不动。删掉这些字段再推一次，必须不抛且落到 think。
delete sessionSnap.pending
legacySlice.partial = null
legacySlice.runningCalls = []
legacySlice.turnEnds = new Map()
let regressThrew = null
try {
  notify()
} catch (error) {
  regressThrew = error
}
check('0.1.5 形状快照不抛错（runningCalls/turnEnds 缺失回归）', regressThrew === null)
// 此时仍有 working 粘滞窗口，所以 think / working 都算对；关键是不能掉回 idle
check('缺字段时回合中仍在干活态', classesOf() === 'think' || classesOf() === 'working')

// 状态机：回合正常结束 → celebrate（瞬态）
sessionSnap.running = false
legacySlice.runningCalls = []
legacySlice.turnEnds = new Map([[1, 5]])
notify()
check('回合完成 → celebrate', classesOf() === 'celebrate')

// 回归（用户实报「庆祝一直停不下来」）：回合结束后快照就不再更新了，
// 没有新的 notify 时 celebrate 也必须自己到点结束（CELEBRATE_MS = 2500）。
await new Promise((r) => setTimeout(r, 3000))
check('不靠下一条快照，celebrate 自己到点结束', classesOf() !== 'celebrate')

// 回归（用户实报「写代码时不切 working」）：短工具调用时 legacy.runningCalls 可能
// 整个生命周期都观察不到，但流式消息里已经出现 tool-call 块。只认 runningCalls 会漏。
sessionSnap.running = true
legacySlice.runningCalls = []
legacySlice.partial = { turn: 2, step: 1, blocks: [{ kind: 'tool-call', callId: 'c9', name: 'pwsh', argsRaw: '{}' }] }
notify()
check('partial 里出现 tool-call → working', classesOf() === 'working')
legacySlice.partial = null
legacySlice.runningCalls = []
notify()

// 状态机：error 边沿（新错误出现）
sessionSnap.lastAgentError = 'boom'
notify()
check('新错误 → error', classesOf() === 'error')

// 会话切走 → idle
currentId = undefined
ctx.sessions.list.notify()
check('无会话 → idle', classesOf() === 'idle')

// 交互：单击戳戳（加权触发 squish/rolling/dizzy）
pet.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
check('单击触发加权互动类', pet.classList.contains('squish') || pet.classList.contains('rolling') || pet.classList.contains('dizzy'))

// 连戳升级：戳到第 3 下开始不耐烦，第 6 下闹脾气
const poke = () => pet.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
poke() // 第 2 下（上面已经戳过一次）
check('连戳 2 下仍是普通反应', !pet.classList.contains('annoyed') && !pet.classList.contains('sulking'))
poke()
check('连戳 3 下进入不耐烦', pet.classList.contains('annoyed'))
poke(); poke(); poke()
check('连戳 6 下闹脾气', pet.classList.contains('sulking'))
check('闹脾气时不再叠加不耐烦', !pet.classList.contains('annoyed'))

// 干活了就不端着脾气
currentId = 's1'
ctx.sessions.list.notify()
check('进入非 idle 状态自动收起脾气', !pet.classList.contains('sulking'))
currentId = undefined
ctx.sessions.list.notify()

// 右键菜单：快捷菜单精简，更多设置进入分类子菜单
pet.dispatchEvent(new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 200, clientY: 200 }))
const menu = rootEl.querySelector('.dsh-whale-menu')
check('右键打开菜单', menu?.classList.contains('open') === true)
const quickButtons = [...(menu?.querySelectorAll('button') ?? [])]
check('快捷菜单不超过 6 项', quickButtons.length <= 6)
const soundBtn = quickButtons.find((b) => b.textContent.includes('音效'))
check('快捷菜单有音效开关', soundBtn !== undefined)
const pretendBtn = quickButtons.find((b) => b.textContent.includes('假装工作'))
check('快捷菜单有假装工作', pretendBtn !== undefined)
soundBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
// 音效切换会关闭并重建快捷菜单，重新打开验证文案变化
pet.dispatchEvent(new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 200, clientY: 200 }))
const soundBtn2 = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('音效'))
check('音效开关切换文案', soundBtn2 !== undefined && soundBtn2.textContent !== soundBtn?.textContent)

// 换颜色：默认主题蓝 → 更多设置 → 外观 → 夜黑（眼睛应反白）
check('默认皮肤变量（主题蓝）', rootEl?.style.getPropertyValue('--pw-body') === '#4D6BFE')
check('默认眼睛变量（暖墨）', rootEl?.style.getPropertyValue('--pw-eye') === '#2E2A24')
pet.dispatchEvent(new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 200, clientY: 200 }))
const moreBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('更多设置'))
check('快捷菜单有更多设置', moreBtn !== undefined)
moreBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
check('更多菜单保持打开', menu?.classList.contains('open') === true)
const appearanceBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('外观'))
check('更多菜单有外观分类', appearanceBtn !== undefined)
const statsBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('陪伴记录'))
check('更多菜单有陪伴记录分类', statsBtn !== undefined)

// 验证陪伴记录子菜单
statsBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const statsItems = [...(menu?.querySelectorAll('.pw-stats-item') ?? [])]
check('陪伴记录展示项存在', statsItems.length >= 4)
const bondItem = statsItems.find((el) => el.textContent.includes('关系'))
check('陪伴记录含关系档位', bondItem !== undefined)
// 刚挂载没多少互动，分数只够初识档
check('新装是初识档', bondItem?.textContent.includes('初识') === true)
check('初识档显示下一档进度', /下一档 \d+%/.test(bondItem?.textContent ?? ''))

// 返回更多菜单并进外观
const backBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('返回'))
backBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const appearanceBtn2 = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('外观'))
appearanceBtn2?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
check('外观菜单保持打开', menu?.classList.contains('open') === true)
const nightBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('夜黑'))
check('外观菜单列出夜黑', nightBtn !== undefined)
nightBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
check('切夜黑后身体变量', rootEl?.style.getPropertyValue('--pw-body') === '#262626')
check('切夜黑后眼睛反白', rootEl?.style.getPropertyValue('--pw-eye') === '#F7F2E6')
check('皮肤持久化', window.localStorage.getItem('pet-whale:palette') === 'night')

// 大小：外观菜单里循环切档
const sizeBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('大小'))
check('外观菜单有大小', sizeBtn !== undefined)
check('默认是标准档', sizeBtn?.textContent.includes('标准') === true)
check('默认缩放为 1', rootEl?.style.getPropertyValue('--pw-scale') === '1')
sizeBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
check('切到下一档 1.3', rootEl?.style.getPropertyValue('--pw-scale') === '1.3')
check('大小已落盘', window.localStorage.getItem('pet-whale:scale') === '1.3')
const sizeBtn2 = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('大小'))
check('菜单原地刷新成大档', sizeBtn2?.textContent.includes('大') === true)
// 非法档位的验证放到重挂那一段，那里才真的会走 loadScale


// 行为子菜单：不应再出现“假装工作”，应包含“游泳”
pet.dispatchEvent(new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 200, clientY: 200 }))
const moreBtn2 = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('更多设置'))
moreBtn2?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const behaviorBtn = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('行为'))
check('更多菜单有行为分类', behaviorBtn !== undefined)
behaviorBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const behaviorButtons = [...(menu?.querySelectorAll('button') ?? [])]
check('行为菜单不含假装工作', behaviorButtons.every((b) => !b.textContent.includes('假装工作')))
check('行为菜单含游泳', behaviorButtons.some((b) => b.textContent.includes('游泳')))

// 行为菜单：0.7 新增的两个开关都在
check('行为菜单含完成提醒', behaviorButtons.some((b) => b.textContent.includes('完成提醒')))
check('行为菜单含久坐提醒', behaviorButtons.some((b) => b.textContent.includes('久坐提醒')))
check('久坐提醒默认关', behaviorButtons.some((b) => b.textContent.includes('久坐提醒：关')))

// 久坐提醒：点一下切到 45 分钟
const sedBtn = behaviorButtons.find((b) => b.textContent.includes('久坐提醒'))
sedBtn?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const sedBtn2 = [...(menu?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('久坐提醒'))
check('久坐提醒可切换到 45 分钟', sedBtn2?.textContent.includes('45') === true)
check('久坐设置已落盘', window.localStorage.getItem('pet-whale:sedentary') === '45')
pet.dispatchEvent(new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 200, clientY: 200 }))
menu?.classList.remove('open')

// 完成提醒：页面在后台时完成一个回合 → 标签页标题被改写；回到前台 → 还原
let pageHidden = false
Object.defineProperty(window.document, 'hidden', { configurable: true, get: () => pageHidden })
const originalTitle = 'DeepSeek Harness'
window.document.title = originalTitle
pageHidden = true
currentId = 's1'
ctx.sessions.list.notify()
sessionSnap.running = true
legacySlice.partial = null
legacySlice.runningCalls = []
sessionSnap.lastAgentError = null
sessionSnap.openError = null
notify()
sessionSnap.running = false
legacySlice.turnEnds = new Map([[1, 5], [2, 9]])
notify()
check('后台完成回合 → 标题被改写', window.document.title.startsWith('✅'))
check('标题保留原文', window.document.title.includes(originalTitle))

pageHidden = false
window.document.dispatchEvent(new window.Event('visibilitychange'))
check('回到前台 → 标题还原', window.document.title === originalTitle)

// 甩晕：抓住后左右猛甩，四次掉头就该晕
// jsdom 没有指针捕获，补个空实现，否则 pointerdown 直接抛错
pet.setPointerCapture = () => {}
pet.releasePointerCapture = () => {}
const ptr = (type, x) =>
  new window.MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: x, clientY: 300 })
const dialog = rootEl?.querySelector('.dsh-whale-dialog')
pet.dispatchEvent(Object.assign(ptr('pointerdown', 300), { pointerId: 1 }))
// 起手一条腿，然后来回四次，每次都走够行程
for (const x of [340, 260, 340, 260, 340]) {
  pet.dispatchEvent(Object.assign(ptr('pointermove', x), { pointerId: 1 }))
}
check('猛甩后进入甩晕态', pet?.classList.contains('shaken') === true)
check('甩晕说了话', /晕|停停停|金星|泡泡/.test(dialog?.textContent ?? ''))
pet.dispatchEvent(Object.assign(ptr('pointerup', 340), { pointerId: 1 }))

// 慢慢来回挪不该被当成甩：行程够但每次都超出时间窗
pet.classList.remove('shaken')
pet.dispatchEvent(Object.assign(ptr('pointerdown', 300), { pointerId: 2 }))
pet.dispatchEvent(Object.assign(ptr('pointermove', 340), { pointerId: 2 }))
pet.dispatchEvent(Object.assign(ptr('pointermove', 335), { pointerId: 2 }))
check('小幅晃动不算甩', pet?.classList.contains('shaken') === false)
pet.dispatchEvent(Object.assign(ptr('pointerup', 335), { pointerId: 2 }))

// 双击：初识档还轮不到翻肚皮，仍是翻跟头
pet.classList.remove('shaken')
pet.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true, cancelable: true }))
check('初识档双击仍是翻滚', pet?.classList.contains('belly-up') === false)

// 拖到最左边 → 挤扁；离开边缘 → 恢复
rootEl.style.left = '400px'
rootEl.style.top = '300px'
pet.dispatchEvent(Object.assign(ptr('pointerdown', 300), { pointerId: 3 }))
pet.dispatchEvent(Object.assign(ptr('pointermove', -2000), { pointerId: 3 }))
check('贴左边挤扁', rootEl?.classList.contains('edge-left') === true)
pet.dispatchEvent(Object.assign(ptr('pointermove', 500), { pointerId: 3 }))
check('离开边缘恢复', rootEl?.classList.contains('edge-left') === false)
pet.dispatchEvent(Object.assign(ptr('pointerup', 500), { pointerId: 3 }))
check(
  '松手清掉边缘态',
  rootEl?.classList.contains('edge-left') === false && rootEl?.classList.contains('edge-right') === false,
)

// 拖着不放又不动：三秒后开始不耐烦。这条只能真等，没有假时钟
pet.dispatchEvent(Object.assign(ptr('pointerdown', 300), { pointerId: 4 }))
pet.dispatchEvent(Object.assign(ptr('pointermove', 340), { pointerId: 4 }))
check('刚拖起来还不耐烦不了', pet?.classList.contains('impatient') === false)
await new Promise((r) => setTimeout(r, 2200))
check('拖着不动两秒 → 不耐烦', pet?.classList.contains('impatient') === true)
check('不耐烦说了话', /手不酸|放我下来|半空|还在吗/.test(dialog?.textContent ?? ''))
pet.dispatchEvent(Object.assign(ptr('pointerup', 340), { pointerId: 4 }))
check('松手不再不耐烦', pet?.classList.contains('impatient') === false)

// 熟悉度：直接把存档写成高分，重挂一次看是否进到满档
dispose()
window.localStorage.setItem(
  'pet-whale:stats',
  JSON.stringify({ completedRounds: 100, errorCount: 0, interactionCount: 300, firstDate: '2020-01-01', bondTier: 0 }),
)
// 存储里塞个离谱值：重挂时该被拒掉回落到 1，而不是把屏幕占满
window.localStorage.setItem('pet-whale:scale', '40')
const dispose2 = exports_.apply(ctx)
const rootEl2 = window.document.querySelector('[data-dsh-whale]')
const pet2 = rootEl2?.querySelector('.pet-official')
const menu2 = rootEl2?.querySelector('.dsh-whale-menu')
pet2?.dispatchEvent(new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 200, clientY: 200 }))
;[...(menu2?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('更多设置'))
  ?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
;[...(menu2?.querySelectorAll('button') ?? [])].find((b) => b.textContent.includes('陪伴记录'))
  ?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const bondItem2 = [...(menu2?.querySelectorAll('.pw-stats-item') ?? [])].find((el) => el.textContent.includes('关系'))
check('非法档位被拒，回落标准', rootEl2?.style.getPropertyValue('--pw-scale') === '1')
check('高分存档 → 形影不离档', bondItem2?.textContent.includes('形影不离') === true)
check('满档不显示进度', bondItem2?.textContent.includes('满') === true)
// 升档要落盘，不然每次进来都恭喜一遍
check('升档已写回存档', JSON.parse(window.localStorage.getItem('pet-whale:stats')).bondTier === 2)
const dialog2 = rootEl2?.querySelector('.dsh-whale-dialog')
pet2?.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true, cancelable: true }))
check('形影不离档双击翻肚皮', pet2?.classList.contains('belly-up') === true)
check('翻肚皮说了话', /肚皮|放松/.test(dialog2?.textContent ?? ''))
dispose2()

// dispose
check('dispose 移除容器', window.document.querySelector('[data-dsh-whale]') === null)
check('dispose 移除样式', window.document.getElementById('pet-whale-style') === null)

console.log(failures === 0 ? '\n全部通过' : `\n${failures} 项失败`)
process.exit(failures === 0 ? 0 : 1)
