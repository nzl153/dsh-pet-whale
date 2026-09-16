// pet-whale client bundle：纯 DOM 桌宠。
// apply(ctx) 由官方 client 通道调用；状态来自 ctx.sessions（会话生命周期快照）
// 与 ctx.uiConversation（会话对话视图，提供 partial / runningCalls / turnEnds）。
import type { Context } from '@deepseek-ai/cordis'
import type { ISessions, SessionFace } from '@deepseek-ai/dsh-api-session-controller/client'
import type { ChatSnapshot } from '@deepseek-ai/dsh-client-ui-chat/client'
import { BASE_CSS } from './styles'
import { WhaleSounds } from './sounds'
import { WhaleDriver, type WhaleSnapshot, type WhaleState } from './state'
import { PALETTES, applyPalette, loadPaletteId, paletteOf, savePaletteId } from './palettes'
import { PETS, loadPetId, petOf, savePetId, type PetModule } from './pets'
import { detectBrowserLocale, getStrings, paletteName, petName, type PetLocale, type PetStrings } from './i18n'
import { WhaleSwimmer } from './swim'

// 官方 client 通道的服务闸：等 sessions / locale / uiConversation 服务就绪后再 apply。
// uiConversation 由 @deepseek-ai/dsh-client-ui-conversation 提供，
// chat 视图（ChatSnapshot）由 @deepseek-ai/dsh-client-ui-chat 注册。
export const inject = ['sessions', 'locale', 'uiConversation']

const STATES: readonly WhaleState[] = ['idle', 'think', 'working', 'celebrate', 'error', 'wait', 'disappointed']
const POS_KEY = 'pet-whale:pos'
/** 隐藏状态：'1' 表示隐藏到右下角小按钮 */
const HIDDEN_KEY = 'pet-whale:hidden'
const PRETEND_KEY = 'pet-whale:pretend'
const SWIM_KEY = 'pet-whale:swim'
const THINK_TICKER_KEY = 'pet-whale:think-ticker'
const MINI_POS_KEY = 'pet-whale:mini-pos'
const AUTO_HIDE_KEY = 'pet-whale:auto-hide'
/** 完成提醒：页面在后台时闪标签页标题 */
const NOTIFY_KEY = 'pet-whale:notify'
/** 系统通知：需要浏览器授权，默认关 */
const SYS_NOTIFY_KEY = 'pet-whale:sys-notify'
/** 久坐提醒阈值（分钟），0 表示关 */
const SEDENTARY_KEY = 'pet-whale:sedentary'
const SEDENTARY_CHOICES = [0, 45, 60, 90] as const
/** 久坐计时的心跳间隔 */
const SEDENTARY_TICK_MS = 60000

/**
 * 熟悉度门槛：分数越过就进下一档。
 * 分数 = 互动次数 + 完成回合×2 + 共处天数×4——三个维度都算，
 * 免得只靠猛戳一天就刷满，"处得久"本身也该有分量。
 */
const BOND_THRESHOLDS = [0, 80, 400] as const
/** 形影不离档才有的主动搭话：检查间隔，与真正开口的概率 */
const CHATTER_TICK_MS = 45000
const CHATTER_CHANCE = 0.18

/**
 * 抓住左右猛甩：靠"方向反转"计数，不看速度。
 * 一条腿走够 SHAKE_MIN_LEG 才算一次真甩动，免得手抖被当成甩；
 * 反转要挤在 SHAKE_WINDOW_MS 里，慢慢来回挪不该把它晃晕。
 */
const SHAKE_MIN_LEG = 26
const SHAKE_REVERSALS = 4
const SHAKE_WINDOW_MS = 1100
const SHAKEN_MS = 1600
/** 晕完还要缓一会儿，不然一路甩下去会连环触发 */
const SHAKE_COOLDOWN_MS = 1400
/** 甩晕之后游不直的时长 */
const WOOZY_MS = 12000
/** 翻肚皮动画时长，与 pw-bellyUp 对齐 */
const BELLY_UP_MS = 2000
/** 拖着不放又不动多久开始不耐烦 */
const DRAG_IDLE_MS = 2000
/** 判定"贴边"的容差：拖到离边这么近就算压上去了 */
const EDGE_SLACK = 2
/** 离开页面超过这么久，视为已经休息过，久坐计时清零 */
const SEDENTARY_AWAY_RESET_MS = 600000
const AUTO_HIDE_CHECK_MS = 30000
/** 智能避让：只有 idle 且光标在身侧停留这么久才让开 */
const AVOID_DWELL_MS = 900
const AVOID_MARGIN = 48
const AVOID_STEP = 120
/** 抓取/右键后 8 秒内不再避让，保证“想抓就能抓住” */
const AVOID_COOLDOWN_MS = 8000
const SLEEP_MS = 20000
const DIALOG_MS = 2600
/** 自动音效最小间隔（防 think/working 抖动连响） */
const SOUND_GAP_MS = 1200

const pick = (list: string[]): string => list[Math.floor(Math.random() * list.length)]

/** DSH locale 服务的最小接口（不引入额外依赖）。 */
interface LocaleLike {
  getLocale(): { active: string }
  subscribe(fn: () => void): () => void
}

export function apply(ctx: Context): () => void {
  if (typeof document === 'undefined') return () => {}

  // 双挂载防护：先清掉旧实例
  document.querySelectorAll('[data-dsh-whale]').forEach((el) => el.remove())
  document.getElementById('pet-whale-style')?.remove()
  document.getElementById('pet-whale-pet-style')?.remove()

  // ===== 样式 =====
  // 两张表：BASE_CSS 常驻（与宠物无关的 UI + 全部 keyframes）；
  // petStyle 只装"当前宠物"的私有样式，切宠物时整段替换 → 两只宠物的选择器与动画永不共存。
  const style = document.createElement('style')
  style.id = 'pet-whale-style'
  style.textContent = BASE_CSS
  document.head.appendChild(style)

  const petStyle = document.createElement('style')
  petStyle.id = 'pet-whale-pet-style'
  document.head.appendChild(petStyle)


    // ===== 语言 =====
    const localeService = (ctx as unknown as { locale?: LocaleLike }).locale
    let locale: PetLocale = localeService?.getLocale().active === 'en' ? 'en' : detectBrowserLocale()

  // ===== 宠物 =====
  // 当前宠物决定 .pet-official 塞哪段 SVG、挂哪张私有样式表、说什么话；选择记在 localStorage。
  let activePet: PetModule = petOf(loadPetId())
  /** 宠物显示名：i18n 优先，缺了就用 PetModule 自带的名字 */
  const petDisplayName = (p: PetModule): string => petName(locale, p.id, locale === 'en' ? p.name.en : p.name.zh)
  /** 当前语言的文案：基准是鲸鱼口吻，宠物可以用 text 覆盖它（见 pets/cat/text.ts） */
  let strings: PetStrings = getStrings(locale, activePet.text?.[locale])

  // ===== DOM =====
  const root = document.createElement('div')
  root.setAttribute('data-dsh-whale', '')
  root.dataset.pet = activePet.id
  root.innerHTML = `
    <span class="dsh-whale-shadow"></span>
    <span class="dsh-whale-wake"></span>
    <div class="dsh-whale-dialog"></div>
    <span class="dsh-whale-snack">🐟</span>
    <span class="dsh-whale-zzz">Zzz...</span>
    <div class="pet-official idle" role="img" aria-label="${strings.aria.petName(petDisplayName(activePet))}">${activePet.html}</div>
    <div class="dsh-whale-menu" role="menu"></div>
  `
  const dialog = root.querySelector<HTMLElement>('.dsh-whale-dialog')!
  const snack = root.querySelector<HTMLElement>('.dsh-whale-snack')!
  // 容器本身永不重建，只有它的 innerHTML 随宠物切换 → 容器上的状态 class 原地保留
  const pet = root.querySelector<HTMLElement>('.pet-official')!
  const menu = root.querySelector<HTMLElement>('.dsh-whale-menu')!
  /**
   * 追光瞳孔：唯一被 JS 直接引用的 SVG 部件。切换宠物会重建 innerHTML，
   * 所以按需现取而不是缓存元素引用（代价只是一次 querySelector）。
   */
  const petPupil = (): SVGCircleElement | null =>
    pet.querySelector<SVGCircleElement>(activePet.pupilSelector ?? '.pupil-highlight')

  /**
   * 切换宠物：换内联 SVG + 换宠物私有样式表 + 同步容器尺寸变量。
   * 不碰状态 class，所以新宠物立刻按当前状态动起来，不需要重放状态机。
   */
  const applyPet = (id: string): void => {
    const next = petOf(id)
    activePet = next
    savePetId(next.id)
    root.dataset.pet = next.id
    if (next.size) {
      root.style.setProperty('--pw-pet-w', `${next.size.w}px`)
      root.style.setProperty('--pw-pet-h', `${next.size.h}px`)
    } else {
      // 回落到 BASE_CSS 里的默认盒
      root.style.removeProperty('--pw-pet-w')
      root.style.removeProperty('--pw-pet-h')
    }
    // 文案跟着宠物走：基准（鲸鱼口吻）叠加这只宠物的覆盖，再重算一遍 a11y 标签
    strings = getStrings(locale, next.text?.[locale])
    pet.innerHTML = next.html
    pet.setAttribute('aria-label', strings.aria.petName(petDisplayName(next)))
    petStyle.textContent = next.css
  }
  applyPet(activePet.id)

  // ===== 大小 =====
  const SCALE_KEY = 'pet-whale:scale'
  /** 四档，对应 i18n 的 sizeNames */
  const SCALE_CHOICES = [0.8, 1, 1.3, 1.6] as const
  const loadScale = (): number => {
    try {
      const raw = Number(localStorage.getItem(SCALE_KEY))
      // 只认预设档，别人往存储里塞个 40 会把屏幕占满
      if (SCALE_CHOICES.includes(raw as (typeof SCALE_CHOICES)[number])) return raw
    } catch {
      // 忽略存储异常
    }
    return 1
  }
  let scale = loadScale()
  const applyScale = (next: number) => {
    scale = next
    root.style.setProperty('--pw-scale', String(next))
    try {
      localStorage.setItem(SCALE_KEY, String(next))
    } catch {
      // 忽略存储异常
    }
    // 变大之后原来的位置可能已经顶出屏幕，重新钳一次
    place()
    savePos()
  }
  const scaleName = () => strings.panel.sizeNames[SCALE_CHOICES.indexOf(scale as (typeof SCALE_CHOICES)[number])]

  // ===== 位置（localStorage 记忆 + 视口钳制） =====
  /** 一倍大小时的占位，实际尺寸要乘当前缩放 */
  const BASE_W = 137
  const BASE_H = 101
  const PET_W = () => BASE_W * scale
  const PET_H = () => BASE_H * scale
  const petSize = () => ({ w: PET_W(), h: PET_H() })
  const clampPos = (x: number, y: number) => {
    const maxX = Math.max(0, window.innerWidth - PET_W())
    const maxY = Math.max(0, window.innerHeight - PET_H())
    return { x: Math.min(Math.max(0, x), maxX), y: Math.min(Math.max(0, y), maxY) }
  }
  const loadPos = () => {
    try {
      const raw = localStorage.getItem(POS_KEY)
      if (raw !== null) {
        const parsed = JSON.parse(raw) as { x: number; y: number }
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') return clampPos(parsed.x, parsed.y)
      }
    } catch {
      // 解析失败回默认
    }
    return clampPos(window.innerWidth - PET_W() - 16, window.innerHeight - PET_H() - 96)
  }
  const place = () => {
    const { x, y } = clampPos(parseFloat(root.style.left) || 0, parseFloat(root.style.top) || 0)
    root.style.left = `${x}px`
    root.style.top = `${y}px`
    return { x, y }
  }
  const pos = loadPos()
  root.style.left = `${pos.x}px`
  root.style.top = `${pos.y}px`
  document.body.appendChild(root)
  // 初始皮肤（默认陶土；用户换过后从 localStorage 恢复）
  applyPalette(root, paletteOf(loadPaletteId()))
  root.style.setProperty('--pw-scale', String(scale))

  // ===== 主题联动：跟随 DSH 亮/暗主题 =====
  const readTheme = (): 'light' | 'dark' => {
    const scheme = document.documentElement.style.colorScheme
    if (scheme === 'dark' || scheme === 'light') return scheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const applyTheme = () => {
    root.dataset.theme = readTheme()
  }
  const themeObserver = new MutationObserver(applyTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
  applyTheme()

  const savePos = () => {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(place()))
    } catch {
      // 忽略存储失败
    }
  }
  const onResize = () => place()

  // ===== 台词 =====
  let dialogTimer: number | undefined
  const showDialog = (text: string) => {
    // 隐藏时不说话，避免“看不见的鲸鱼还在自言自语”
    if (root.classList.contains('hidden')) return
    dialog.textContent = text
    dialog.classList.add('show')
    window.clearTimeout(dialogTimer)
    dialogTimer = window.setTimeout(() => dialog.classList.remove('show'), DIALOG_MS)
  }

  // ===== 音效 =====
  const sounds = new WhaleSounds()
  sounds.installGestureUnlock()
  let lastAutoSound = 0
  const autoSound = (state: WhaleState) => {
    // 隐藏时静音；页面不可见时也静音
    if (root.classList.contains('hidden') || document.hidden) return
    const now = performance.now()
    if (now - lastAutoSound < SOUND_GAP_MS) return
    lastAutoSound = now
    if (state === 'think') sounds.play('bubble')
    else if (state === 'working') sounds.play('work')
    else if (state === 'celebrate') sounds.play('celebrate')
    else if (state === 'error') sounds.play('error')
  }

  // ===== 状态应用 =====
  let visualState: WhaleState = 'idle'
  // 假装工作模式：开启后无论真实状态如何，都表演 working（敲代码）
  let pretendOn = false
  try {
    pretendOn = localStorage.getItem(PRETEND_KEY) === '1'
  } catch {
    // 忽略存储失败
  }
  // 思考链滚动条：默认开启，可右键关闭
  let tickerOn = true
  try {
    tickerOn = localStorage.getItem(THINK_TICKER_KEY) !== '0'
  } catch {
    // 忽略存储失败
  }
  // 最近一次错误文本：error 状态下点击鲸鱼可复制
  let lastErrorText = ''

  // ===== 泡泡 =====
  const popBubble = () => {
    const bubbles = pet.querySelectorAll<HTMLElement>('.bubble')
    if (bubbles.length === 0) return
    const b = bubbles[Math.floor(Math.random() * bubbles.length)]
    b.classList.remove('show')
    void b.offsetWidth
    b.classList.add('show')
    window.setTimeout(() => b.classList.remove('show'), 950)
  }

  // ===== 游泳系统 =====
  const swimmer = new WhaleSwimmer({
    root,
    pet,
    clampPos,
    savePos,
    popBubble,
    showDialog,
    getStrings: () => strings,
    petSize,
    isBusy: () =>
      root.classList.contains(HIDDEN_CLASS) ||
      dragging ||
      document.hidden ||
      menu.classList.contains('open') ||
      sleeping ||
      // 待机微游动的补间还没走完，此时启动游泳会两套动画抢同一个 left
      Date.now() < microSwimUntil ||
      visualState !== 'idle',
  })

  // ===== 陪伴统计存储 =====
  const STATS_KEY = 'pet-whale:stats'
  interface CompanionStats {
    completedRounds: number
    errorCount: number
    interactionCount: number
    firstDate: string
    /** 上次达到的关系档，只用来判断"这次是不是刚升上去" */
    bondTier: number
  }
  const loadStats = (): CompanionStats => {
    try {
      const raw = localStorage.getItem(STATS_KEY)
      if (raw !== null) {
        const parsed = JSON.parse(raw) as Partial<CompanionStats>
        return {
          completedRounds: typeof parsed.completedRounds === 'number' ? parsed.completedRounds : 0,
          errorCount: typeof parsed.errorCount === 'number' ? parsed.errorCount : 0,
          interactionCount: typeof parsed.interactionCount === 'number' ? parsed.interactionCount : 0,
          firstDate: typeof parsed.firstDate === 'string' ? parsed.firstDate : new Date().toISOString().slice(0, 10),
          bondTier: typeof parsed.bondTier === 'number' ? parsed.bondTier : 0,
        }
      }
    } catch {
      // 忽略存储异常
    }
    const init: CompanionStats = {
      completedRounds: 0,
      errorCount: 0,
      interactionCount: 0,
      firstDate: new Date().toISOString().slice(0, 10),
      bondTier: 0,
    }
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(init))
    } catch {
      // 忽略存储异常
    }
    return init
  }
  const saveStats = (s: CompanionStats) => {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(s))
    } catch {
      // 忽略存储异常
    }
  }
  const recordCelebrate = () => {
    const s = loadStats()
    s.completedRounds++
    saveStats(s)
    checkBondUp()
  }
  const recordError = () => {
    const s = loadStats()
    s.errorCount++
    saveStats(s)
  }
  const recordInteraction = () => {
    const s = loadStats()
    s.interactionCount++
    saveStats(s)
    checkBondUp()
  }
  const calcDays = (s: CompanionStats): number => {
    try {
      const start = new Date(s.firstDate).getTime()
      const now = Date.now()
      if (Number.isNaN(start)) return 1
      return Math.max(1, Math.floor((now - start) / 86400000) + 1)
    } catch {
      return 1
    }
  }

  const bondScore = (s: CompanionStats): number =>
    s.interactionCount + s.completedRounds * 2 + calcDays(s) * 4
  const bondTierOf = (score: number): number => {
    let tier = 0
    for (let i = 0; i < BOND_THRESHOLDS.length; i++) if (score >= BOND_THRESHOLDS[i]) tier = i
    return tier
  }
  /** 距下一档的百分比；已经满档返回 -1 */
  const bondProgress = (score: number, tier: number): number => {
    if (tier >= BOND_THRESHOLDS.length - 1) return -1
    const from = BOND_THRESHOLDS[tier]
    const to = BOND_THRESHOLDS[tier + 1]
    return Math.max(0, Math.min(99, Math.round(((score - from) / (to - from)) * 100)))
  }
  const currentTier = (): number => bondTierOf(bondScore(loadStats()))
  /**
   * 升档播报。写回存储放在弹话之前——弹话没弹出来也不该让同一档反复恭喜。
   * 分数只增不减，所以这里不必处理回落。
   */
  const checkBondUp = () => {
    const st = loadStats()
    const tier = bondTierOf(bondScore(st))
    if (tier <= st.bondTier) return
    st.bondTier = tier
    saveStats(st)
    window.setTimeout(() => showDialog(strings.bond.levelUp[tier]), 1500)
  }

  const setState = (next: WhaleState, changed: boolean) => {
    const effective: WhaleState = pretendOn ? 'working' : next
    // 真开始干活了就别端着脾气，闹脾气只在闲着的时候成立
    if (effective !== 'idle' && sulking) clearSulk()
    if (effective !== 'idle') wake()
    for (const s of STATES) pet.classList.toggle(s, s === effective)
    visualState = effective
    syncMiniState(effective)
    swimmer.onStateChange(effective)
    if (effective === 'idle') scheduleIdleMicro()
    else clearIdleMicro()
    if (changed) {
      showDialog(pick(strings.status[effective]))
      autoSound(effective)
      if (effective === 'celebrate') {
        recordCelebrate()
        notifyDone()
        const curX = parseFloat(root.style.left) || 0
        const curY = parseFloat(root.style.top) || 0
        swimmer.spawnConfetti(curX + PET_W() / 2, curY + PET_H() * 0.35, 24)
      } else if (effective === 'error') {
        recordError()
      }
    }
  }

  // ===== 戳戳 / 翻滚 / 开心 / 戳晕 / 欢迎 =====
  const triggerSquish = () => {
    markActive()
    recordInteraction()
    popBubble()
    sounds.play('bubble')
    pet.classList.remove('squish', 'dizzy', 'joy')
    void pet.offsetWidth
    pet.classList.add('squish')
    window.setTimeout(() => pet.classList.remove('squish'), 450)
    showDialog(pick(strings.bond.poke[currentTier()]))
  }
  const triggerRoll = () => {
    markActive()
    recordInteraction()
    sounds.play('trick')
    showDialog(strings.feedback.roll)
    pet.classList.remove('rolling', 'dizzy', 'joy')
    void pet.offsetWidth
    pet.classList.add('rolling', 'spouting')
    const curX = parseFloat(root.style.left) || 0
    const curY = parseFloat(root.style.top) || 0
    swimmer.spawnSplash(curX + PET_W() / 2, curY + PET_H() * 0.64, 6)
    swimmer.spawnWaterRipple(curX + PET_W() / 2, curY + PET_H() * 0.64, false)
    popBubble()
    window.setTimeout(() => popBubble(), 200)
    window.setTimeout(() => pet.classList.remove('rolling', 'spouting'), 1100)
  }
  const triggerJoy = () => {
    if (root.classList.contains(HIDDEN_CLASS)) return
    markActive()
    recordInteraction()
    pet.classList.remove('joy', 'squish', 'dizzy')
    void pet.offsetWidth
    pet.classList.add('joy')
    sounds.play('celebrate')
    showDialog(pick(strings.feedback.joy))
    popBubble()
    window.setTimeout(() => pet.classList.remove('joy'), 1100)
  }
  const triggerDizzy = () => {
    markActive()
    recordInteraction()
    pet.classList.remove('dizzy', 'squish', 'joy')
    void pet.offsetWidth
    pet.classList.add('dizzy')
    sounds.play('bubble')
    showDialog(pick(strings.feedback.pokeDizzy))
    window.setTimeout(() => pet.classList.remove('dizzy'), 900)
  }
  // ===== 连戳升级 =====
  // 戳一下就随机演一个，戳二十下还是同样的随机分布——那是控件，不是活物。
  // 连戳计数会在停手后自己衰减，所以"惹毛它"和"哄好它"都由手速决定。
  const POKE_ANNOYED_AT = 3
  const POKE_SULK_AT = 6
  /** 停手这么久，连戳计数清零 */
  const POKE_DECAY_MS = 2600
  /** 闹脾气持续时长，期间再戳只会更闹 */
  const SULK_MS = 4200
  let pokeStreak = 0
  let pokeDecayTimer = 0
  let sulking = false
  let sulkTimer = 0

  const clearSulk = () => {
    if (sulkTimer !== 0) {
      window.clearTimeout(sulkTimer)
      sulkTimer = 0
    }
    sulking = false
    pet.classList.remove('sulking')
  }
  const bumpPokeStreak = () => {
    pokeStreak += 1
    if (pokeDecayTimer !== 0) window.clearTimeout(pokeDecayTimer)
    pokeDecayTimer = window.setTimeout(() => {
      pokeDecayTimer = 0
      pokeStreak = 0
    }, POKE_DECAY_MS)
  }
  const triggerAnnoyed = () => {
    markActive()
    recordInteraction()
    pet.classList.remove('annoyed', 'squish', 'dizzy', 'joy')
    void pet.offsetWidth
    pet.classList.add('annoyed')
    sounds.play('bubble')
    showDialog(pick(strings.feedback.pokeAnnoyed))
    window.setTimeout(() => pet.classList.remove('annoyed'), 520)
  }
  const triggerSulk = () => {
    markActive()
    recordInteraction()
    clearSulk()
    sulking = true
    pet.classList.remove('annoyed', 'squish', 'dizzy', 'joy', 'rolling')
    void pet.offsetWidth
    pet.classList.add('sulking')
    sounds.play('bubble')
    showDialog(pick(strings.feedback.pokeSulk))
    sulkTimer = window.setTimeout(() => {
      sulkTimer = 0
      clearSulk()
      pokeStreak = 0
    }, SULK_MS)
  }
  /** 失落时被戳：当作安慰，提前结束自愈 */
  const triggerComfort = () => {
    markActive()
    recordInteraction()
    clearSulk()
    pokeStreak = 0
    pet.classList.remove('joy', 'squish', 'dizzy', 'annoyed')
    void pet.offsetWidth
    pet.classList.add('joy')
    sounds.play('celebrate')
    showDialog(pick(strings.feedback.comfort))
    popBubble()
    window.setTimeout(() => pet.classList.remove('joy'), 1100)
  }

  // ===== 完成提醒：你不看着的时候，让标签页替它喊你 =====
  // 鲸鱼演得再好，你切走了就等于没演。
  let notifyOn = true
  let sysNotifyOn = false
  try {
    notifyOn = localStorage.getItem(NOTIFY_KEY) !== '0'
    sysNotifyOn = localStorage.getItem(SYS_NOTIFY_KEY) === '1'
  } catch {
    // 忽略存储失败
  }
  const hasNotificationApi = typeof window !== 'undefined' && 'Notification' in window
  /** 我们改写标题前的原值；null 表示当前没在闪 */
  let titleBeforeFlash: string | null = null
  let flashedTitle = ''

  const restoreTitle = () => {
    if (titleBeforeFlash === null) return
    // 只有标题仍是我们写的那串才还原——期间 DSH 自己改过标题的话，别覆盖人家的新值
    if (document.title === flashedTitle) document.title = titleBeforeFlash
    titleBeforeFlash = null
    flashedTitle = ''
  }
  const flashTitle = () => {
    if (titleBeforeFlash !== null) return
    titleBeforeFlash = document.title
    flashedTitle = `✅ ${strings.notify.titleDone} · ${titleBeforeFlash}`
    document.title = flashedTitle
  }
  const sendSystemNotification = () => {
    if (!sysNotifyOn || !hasNotificationApi) return
    if (Notification.permission !== 'granted') return
    try {
      const n = new Notification(`${activePet.icon} ${strings.notify.titleDone}`, { body: strings.notify.bodyDone })
      window.setTimeout(() => n.close(), 6000)
    } catch {
      // 通知构造失败（部分环境要求 ServiceWorker）时静默降级到标题闪烁
    }
  }
  /** 回合完成时调用：只在页面不可见时才提醒 */
  const notifyDone = () => {
    if (!document.hidden) return
    if (notifyOn) flashTitle()
    sendSystemNotification()
  }

  // ===== 久坐提醒 =====
  let sedentaryMin = 0
  try {
    const raw = Number(localStorage.getItem(SEDENTARY_KEY))
    if ((SEDENTARY_CHOICES as readonly number[]).includes(raw)) sedentaryMin = raw
  } catch {
    // 忽略存储失败
  }
  let sittingMs = 0
  let hiddenSince = 0
  let sedentaryTimer = 0

  const nudgeRest = () => {
    if (root.classList.contains(HIDDEN_CLASS)) return
    pet.classList.remove('welcome')
    void pet.offsetWidth
    pet.classList.add('welcome', 'spouting')
    showDialog(pick(strings.feedback.restNudge))
    sounds.play('bubble')
    window.setTimeout(() => pet.classList.remove('welcome', 'spouting'), 1400)
  }
  const sedentaryTick = () => {
    if (sedentaryMin === 0) return
    if (document.hidden) return
    sittingMs += SEDENTARY_TICK_MS
    if (sittingMs >= sedentaryMin * 60000) {
      sittingMs = 0
      nudgeRest()
    }
  }
  const startSedentary = () => {
    if (sedentaryTimer !== 0) window.clearInterval(sedentaryTimer)
    sedentaryTimer = 0
    sittingMs = 0
    if (sedentaryMin === 0) return
    sedentaryTimer = window.setInterval(sedentaryTick, SEDENTARY_TICK_MS)
  }
  startSedentary()

  const triggerWelcome = () => {
    if (root.classList.contains(HIDDEN_CLASS) || visualState !== 'idle') return
    pet.classList.remove('welcome')
    void pet.offsetWidth
    pet.classList.add('welcome')
    showDialog(strings.bond.welcome[currentTier()])
    sounds.play('bubble')
    window.setTimeout(() => pet.classList.remove('welcome'), 1200)
  }

  // ===== 隐藏 / 小按钮 / 状态指示 / 拖拽 / 定时 / 关闭 =====
  const HIDDEN_CLASS = 'hidden'
  const MINI_SIZE = 46
  let mini: HTMLButtonElement | null = null
  let quitWhale: () => void = () => {}

  const syncMiniState = (state: WhaleState) => {
    if (mini === null) return
    mini.dataset.state = state
    mini.title = `${strings.aria.miniTitle(state)}`
    // 图标与 a11y 文案跟随当前宠物（隐藏状态下切宠物也立刻对）
    mini.textContent = activePet.icon
    mini.setAttribute('aria-label', strings.aria.mini)
  }

  // ===== 小按钮位置（右下角偏移，localStorage 记忆） =====
  const miniClamp = (right: number, bottom: number) => {
    const maxRight = Math.max(0, window.innerWidth - MINI_SIZE)
    const maxBottom = Math.max(0, window.innerHeight - MINI_SIZE)
    return {
      right: Math.min(Math.max(0, right), maxRight),
      bottom: Math.min(Math.max(0, bottom), maxBottom),
    }
  }
  const loadMiniPos = () => {
    try {
      const raw = localStorage.getItem(MINI_POS_KEY)
      if (raw !== null) {
        const parsed = JSON.parse(raw) as { right: number; bottom: number }
        if (typeof parsed.right === 'number' && typeof parsed.bottom === 'number') return miniClamp(parsed.right, parsed.bottom)
      }
    } catch {
      // 解析失败回默认
    }
    return { right: 14, bottom: 14 }
  }
  const saveMiniPos = () => {
    if (mini === null) return
    try {
      localStorage.setItem(MINI_POS_KEY, JSON.stringify({
        right: parseFloat(mini.style.right) || 0,
        bottom: parseFloat(mini.style.bottom) || 0,
      }))
    } catch {
      // 忽略存储失败
    }
  }

  // ===== 小按钮拖拽 =====
  let miniDrag: { x: number; y: number; right: number; bottom: number } | null = null
  let miniDragging = false
  let miniSuppressClick = false
  const onMiniPointerDown = (e: PointerEvent) => {
    if (e.button !== 0 || mini === null) return
    miniDrag = {
      x: e.clientX,
      y: e.clientY,
      right: parseFloat(mini.style.right) || 0,
      bottom: parseFloat(mini.style.bottom) || 0,
    }
    mini.setPointerCapture(e.pointerId)
  }
  const onMiniPointerMove = (e: PointerEvent) => {
    if (miniDrag === null || mini === null) return
    const dx = e.clientX - miniDrag.x
    const dy = e.clientY - miniDrag.y
    if (!miniDragging && Math.abs(dx) + Math.abs(dy) > 4) {
      miniDragging = true
      miniSuppressClick = true
      mini.classList.add('dragging')
    }
    if (miniDragging) {
      const p = miniClamp(miniDrag.right - dx, miniDrag.bottom - dy)
      mini.style.right = `${p.right}px`
      mini.style.bottom = `${p.bottom}px`
    }
  }
  const onMiniDragEnd = () => {
    if (miniDrag === null) return
    miniDrag = null
    if (miniDragging) {
      miniDragging = false
      // mini 可能已被 removeMini 清掉（桌宠被召回），但 miniDragging 仍必须复位
      mini?.classList.remove('dragging')
      saveMiniPos()
    }
    window.setTimeout(() => { miniSuppressClick = false }, 0)
  }

  const removeMini = () => {
    mini?.remove()
    mini = null
  }
  const createMini = () => {
    if (mini !== null) return
    mini = document.createElement('button')
    mini.type = 'button'
    mini.setAttribute('data-dsh-whale-mini', '')
    mini.setAttribute('aria-label', strings.aria.mini)
    // 小按钮图标跟随当前宠物
    mini.textContent = activePet.icon
    const pos = loadMiniPos()
    mini.style.right = `${pos.right}px`
    mini.style.bottom = `${pos.bottom}px`
    syncMiniState(visualState)
    mini.addEventListener('click', () => {
      if (miniSuppressClick) return
      showWhale()
    })
    mini.addEventListener('pointerdown', onMiniPointerDown)
    mini.addEventListener('pointermove', onMiniPointerMove)
    mini.addEventListener('pointerup', onMiniDragEnd)
    mini.addEventListener('pointercancel', onMiniDragEnd)
    document.body.appendChild(mini)
  }

  const showWhale = () => {
    removeMini()
    root.classList.remove(HIDDEN_CLASS)
    try {
      localStorage.removeItem(HIDDEN_KEY)
    } catch {
      // 忽略存储失败
    }
    place()
    triggerSquish()
    showDialog(strings.feedback.shown)
    swimmer.scheduleNext(1500)
  }
  const hideWhale = () => {
    swimmer.stop()
    root.classList.add(HIDDEN_CLASS)
    try {
      localStorage.setItem(HIDDEN_KEY, '1')
    } catch {
      // 忽略存储失败
    }
    createMini()
  }

  // ===== 定时隐藏 =====
  type AutoHidePlan = { at: number; daily: boolean; hh: number; mm: number }
  const readAutoHide = (): AutoHidePlan | null => {
    try {
      const raw = localStorage.getItem(AUTO_HIDE_KEY)
      if (raw === null) return null
      const parsed = JSON.parse(raw) as Partial<AutoHidePlan>
      if (typeof parsed.at === 'number' && typeof parsed.daily === 'boolean') return parsed as AutoHidePlan
    } catch {
      // 解析失败视为无计划
    }
    return null
  }
  const saveAutoHide = (plan: AutoHidePlan) => {
    try {
      localStorage.setItem(AUTO_HIDE_KEY, JSON.stringify(plan))
    } catch {
      // 忽略存储失败
    }
  }
  const clearAutoHide = () => {
    try {
      localStorage.removeItem(AUTO_HIDE_KEY)
    } catch {
      // 忽略存储失败
    }
  }
  const nextDailyAt = (hh: number, mm: number) => {
    const d = new Date()
    d.setHours(hh, mm, 0, 0)
    if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1)
    return d.getTime()
  }
  const scheduleOnce = (ms: number) => {
    saveAutoHide({ at: Date.now() + ms, daily: false, hh: 0, mm: 0 })
  }
  const scheduleDaily = (hh: number, mm: number) => {
    saveAutoHide({ at: nextDailyAt(hh, mm), daily: true, hh, mm })
  }
  const checkAutoHide = () => {
    const plan = readAutoHide()
    if (plan === null) return
    if (Date.now() < plan.at) return
    if (plan.daily) scheduleDaily(plan.hh, plan.mm)
    else clearAutoHide()
    if (!root.classList.contains(HIDDEN_CLASS)) hideWhale()
  }
  let autoHideTimer: number | undefined
  const startAutoHide = () => {
    checkAutoHide()
    autoHideTimer = window.setInterval(checkAutoHide, AUTO_HIDE_CHECK_MS)
  }

  // ===== 思考内容滚动条 =====
  // 真实状态为 think 时，把模型最近生成的文字截取一段放在桌宠正上方缓慢滚动；
  // 内容只保留最近 200 字（可读、不冗长），鲸鱼同时保持深潜思考动画。
  const THINK_TICKER_MAX = 200
  const THINK_TICKER_WIDTH = 360
  const ticker = document.createElement('div')
  ticker.setAttribute('data-dsh-whale-think', '')
  ticker.innerHTML = '<span class="dsh-whale-think-label">🧠</span><div class="dsh-whale-think-scroll"><span class="dsh-whale-think-text"></span></div>'
  root.appendChild(ticker)
  const tickerText = ticker.querySelector<HTMLElement>('.dsh-whale-think-text')!
  let tickerOffset = 0
  let tickerRaf = 0
  const hideTicker = () => {
    ticker.classList.remove('show')
    if (tickerRaf !== 0) {
      window.cancelAnimationFrame(tickerRaf)
      tickerRaf = 0
    }
  }
  const tickerTick = () => {
    const max = Math.max(0, tickerText.scrollWidth - ticker.clientWidth)
    tickerOffset += 0.5
    if (tickerOffset > max + 40) tickerOffset = 0
    tickerText.style.transform = `translateX(-${tickerOffset}px)`
    if (ticker.classList.contains('show')) tickerRaf = window.requestAnimationFrame(tickerTick)
    else tickerRaf = 0
  }
  const positionTicker = () => {
    // 水平对齐鲸鱼中心，并夹在视口内；垂直方向悬在鲸鱼头顶上方
    const rect = root.getBoundingClientRect()
    const width = Math.min(THINK_TICKER_WIDTH, window.innerWidth - 24)
    const centerX = rect.left + rect.width / 2
    const left = Math.min(Math.max(centerX, width / 2 + 12), window.innerWidth - width / 2 - 12)
    ticker.style.width = `${width}px`
    ticker.style.left = `${left}px`
    ticker.style.top = `${rect.top - 40}px`
  }
  const updateTicker = (text: string) => {
    if (text.trim() === '') {
      hideTicker()
      return
    }
    tickerText.textContent = text.slice(-THINK_TICKER_MAX)
    tickerOffset = 0
    positionTicker()
    ticker.classList.add('show')
    if (tickerRaf === 0) tickerRaf = window.requestAnimationFrame(tickerTick)
  }
  const partialTextOf = (partial: unknown): string => {
    if (partial === null || typeof partial !== 'object') return ''
    const blocks = (partial as { blocks?: readonly unknown[] }).blocks
    if (!Array.isArray(blocks)) return ''
    const parts: string[] = []
    for (const block of blocks) {
      if (block === null || typeof block !== 'object') continue
      const b = block as { kind?: string; text?: unknown }
      if ((b.kind === 'text' || b.kind === 'reasoning') && typeof b.text === 'string') parts.push(b.text)
    }
    return parts.join(' ')
  }
  // 流式消息里出现 tool-call 块 = 模型已经吐出工具调用。
  // legacy.runningCalls 是另一条路（工具真正在飞），短调用时可能整个生命周期都观察不到，
  // 所以两个信号取或，别让鲸鱼漏掉"敲代码"。
  const partialHasToolCall = (partial: unknown): boolean => {
    if (partial === null || typeof partial !== 'object') return false
    const blocks = (partial as { blocks?: readonly unknown[] }).blocks
    if (!Array.isArray(blocks)) return false
    for (const block of blocks) {
      if (block !== null && typeof block === 'object' && (block as { kind?: string }).kind === 'tool-call') return true
    }
    return false
  }

  // ===== 后台省电：页面不可见时暂停动画/音效/思考流 =====
  let pageVisible = true
  const onVisibility = () => {
    pageVisible = !document.hidden
    root.classList.toggle('paused', document.hidden)
    mini?.classList.toggle('paused', document.hidden)
    if (document.hidden) {
      hiddenSince = Date.now()
      hideTicker()
      swimmer.stop()
    } else {
      // 回来了就收掉标题上的提醒；离开够久则视为休息过，久坐重新计时
      restoreTitle()
      if (hiddenSince !== 0 && Date.now() - hiddenSince >= SEDENTARY_AWAY_RESET_MS) sittingMs = 0
      hiddenSince = 0
      if (visualState === 'idle') swimmer.scheduleNext(2000)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)
  onVisibility()

          // ===== 右键菜单 =====
    let menuMode: 'main' | 'more' | 'appearance' | 'behavior' | 'stats' | 'rest' = 'main'
    const appendMenuBtn = (label: string, onClick: () => void, cls = '') => {
      const btn = document.createElement('button')
      btn.type = 'button'
      if (cls) btn.className = cls
      btn.textContent = label
      btn.addEventListener('click', onClick)
      menu.appendChild(btn)
      return btn
    }
    /** 切换开关后原地重画菜单：菜单不关、位置不动 */
    const reopenMenu = (mode: 'main' | 'more' | 'appearance' | 'behavior' | 'stats' | 'rest') => {
      buildMenu(mode)
      menu.classList.add('open')
      positionMenu(lastMenuPos.x, lastMenuPos.y)
    }

    const buildMenu = (mode: 'main' | 'more' | 'appearance' | 'behavior' | 'stats' | 'rest' = 'main') => {
      menuMode = mode
      menu.textContent = ''
      const openMore = () => {
        buildMenu('more')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
      const openAppearance = () => {
        buildMenu('appearance')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
      const openBehavior = () => {
        buildMenu('behavior')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
      const openStats = () => {
        buildMenu('stats')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
      const openRest = () => {
        buildMenu('rest')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
      const backMain = () => {
        buildMenu('main')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
      const backMore = () => {
        buildMenu('more')
        menu.classList.add('open')
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }

      if (mode === 'main') {
        const items: [string, () => void][] = [
          [
            strings.menu.feed,
            () => {
              snack.classList.remove('drop')
              void snack.offsetWidth
              snack.classList.add('drop')
              sounds.play('snack')
              showDialog(strings.feedback.feed)
              window.setTimeout(() => {
                triggerJoy()
              }, 600)
            },
          ],
          [
            strings.menu.headpat,
            () => {
              triggerJoy()
            },
          ],
          [
            `${strings.panel.pretend}${pretendOn ? ' ✓' : ''}`,
            () => {
              pretendOn = !pretendOn
              try {
                localStorage.setItem(PRETEND_KEY, pretendOn ? '1' : '0')
              } catch {
                // 忽略存储失败
              }
              updateTicker('')
              setState(pretendOn ? 'working' : 'idle', true)
              showDialog(pretendOn ? strings.feedback.pretendOn : strings.feedback.pretendOff)
            },
          ],
          [
            sounds.isMuted ? strings.menu.soundOff : strings.menu.soundOn,
            () => {
              const next = !sounds.isMuted
              sounds.setMuted(next)
              buildMenu('main')
              menu.classList.add('open')
              positionMenu(lastMenuPos.x, lastMenuPos.y)
              if (next) sounds.play('bubble')
            },
          ],
          [
            strings.menu.hide,
            () => {
              hideWhale()
            },
          ],
          ...(lastErrorText !== ''
            ? [[strings.menu.copyError, () => {
                try {
                  void navigator.clipboard?.writeText(lastErrorText)
                } catch {
                  // 忽略剪贴板失败
                }
                showDialog(strings.feedback.errorCopied)
              }] as [string, () => void]]
            : []),
          [
            strings.menu.more,
            openMore,
          ],
        ]
        for (const [label, action] of items) {
          appendMenuBtn(label, () => {
            closeMenu()
            action()
          })
        }
        return
      }

      if (mode === 'more') {
        appendMenuBtn(`🎨 ${strings.panel.appearance} ▸`, openAppearance)
        appendMenuBtn(`🧠 ${strings.panel.behavior} ▸`, openBehavior)
        appendMenuBtn(`📊 ${strings.panel.stats} ▸`, openStats)
        appendMenuBtn(`🕐 ${strings.panel.rest} ▸`, openRest)
        appendMenuBtn(strings.panel.back, backMain, 'pw-back')
        return
      }

      if (mode === 'stats') {
        const stats = loadStats()
        const days = calcDays(stats)
        const items = [
          strings.panel.statsCompleted(stats.completedRounds),
          strings.panel.statsInteractions(stats.interactionCount),
          strings.panel.statsErrors(stats.errorCount),
          strings.panel.statsDays(days),
          strings.panel.statsBond(
            strings.bond.tierName[bondTierOf(bondScore(stats))],
            bondProgress(bondScore(stats), bondTierOf(bondScore(stats))),
          ),
        ]
        for (const it of items) {
          const itEl = document.createElement('div')
          itEl.className = 'pw-stats-item'
          itEl.textContent = it
          menu.appendChild(itEl)
        }
        appendMenuBtn(strings.panel.back, backMore, 'pw-back')
        return
      }

      if (mode === 'appearance') {
        // 宠物选择：色板对所有宠物通用，所以先选宠物、再挑配色
        const petTitle = document.createElement('div')
        petTitle.className = 'pw-panel-section-title'
        petTitle.textContent = strings.panel.pet
        menu.appendChild(petTitle)
        for (const p of PETS) {
          const name = petDisplayName(p)
          const petBtn = document.createElement('button')
          petBtn.type = 'button'
          petBtn.className = 'pw-palette-btn'
          // 当前项打勾，跟插件里其它开关的写法保持一致
          petBtn.appendChild(document.createTextNode(`${p.icon} ${name}${p.id === activePet.id ? ' ✅' : ''}`))
          petBtn.addEventListener('click', () => {
            closeMenu()
            if (p.id === activePet.id) return
            applyPet(p.id)
            // 隐藏状态下切宠物：小按钮的图标/文案也要跟着换
            syncMiniState(visualState)
            showDialog(strings.feedback.petApplied(name))
            sounds.play('bubble')
          })
          menu.appendChild(petBtn)
        }
        const colorTitle = document.createElement('div')
        colorTitle.className = 'pw-panel-section-title'
        colorTitle.textContent = strings.panel.colors
        menu.appendChild(colorTitle)
        for (const p of PALETTES) {
          const btn = document.createElement('button')
          btn.type = 'button'
          btn.className = 'pw-palette-btn'
          const dot = document.createElement('span')
          dot.className = 'pw-swatch'
          dot.style.background = `linear-gradient(135deg, ${p.light}, ${p.main}, ${p.dark})`
          btn.appendChild(dot)
          btn.appendChild(document.createTextNode(paletteName(locale, p.id, p.name)))
          btn.addEventListener('click', () => {
            closeMenu()
            applyPalette(root, p)
            savePaletteId(p.id)
            showDialog(strings.feedback.paletteApplied(paletteName(locale, p.id, p.name)))
            sounds.play('bubble')
          })
          menu.appendChild(btn)
        }
        appendMenuBtn(strings.panel.size(scaleName()), () => {
          const i = SCALE_CHOICES.indexOf(scale as (typeof SCALE_CHOICES)[number])
          applyScale(SCALE_CHOICES[(i + 1) % SCALE_CHOICES.length])
          reopenMenu('appearance')
          showDialog(strings.feedback.sizeSet(scaleName()))
          sounds.play('bubble')
        })
        appendMenuBtn(strings.panel.back, backMore, 'pw-back')
        return
      }

      if (mode === 'behavior') {
                appendMenuBtn(`${strings.panel.thinkTicker}${tickerOn ? ' ✓' : ''}`, () => {
          tickerOn = !tickerOn
          try {
            localStorage.setItem(THINK_TICKER_KEY, tickerOn ? '1' : '0')
          } catch {
            // 忽略存储失败
          }
          updateTicker('')
          showDialog(tickerOn ? strings.feedback.tickerOn : strings.feedback.tickerOff)
          buildMenu('behavior')
          menu.classList.add('open')
          positionMenu(lastMenuPos.x, lastMenuPos.y)
        })
        appendMenuBtn(`${strings.panel.swim}${swimmer.isEnabled ? ' ✓' : ''}`, () => {
          const next = swimmer.toggle()
          showDialog(next ? strings.feedback.swimOn : strings.feedback.swimOff)
          buildMenu('behavior')
          menu.classList.add('open')
          positionMenu(lastMenuPos.x, lastMenuPos.y)
        })
appendMenuBtn(`${strings.panel.sound}${sounds.isMuted ? ' ✕' : ' ✓'}`, () => {
          const next = !sounds.isMuted
          sounds.setMuted(next)
          buildMenu('behavior')
          menu.classList.add('open')
          positionMenu(lastMenuPos.x, lastMenuPos.y)
          if (next) sounds.play('bubble')
        })
        appendMenuBtn(`${strings.panel.notify}${notifyOn ? ' ✓' : ' ✕'}`, () => {
          notifyOn = !notifyOn
          try {
            localStorage.setItem(NOTIFY_KEY, notifyOn ? '1' : '0')
          } catch {
            // 忽略存储失败
          }
          if (!notifyOn) restoreTitle()
          showDialog(notifyOn ? strings.feedback.notifyOn : strings.feedback.notifyOff)
          reopenMenu('behavior')
        })
        if (hasNotificationApi) {
          appendMenuBtn(`${strings.panel.sysNotify}${sysNotifyOn ? ' ✓' : ' ✕'}`, () => {
            const turningOn = !sysNotifyOn
            const commit = (granted: boolean) => {
              sysNotifyOn = turningOn && granted
              try {
                localStorage.setItem(SYS_NOTIFY_KEY, sysNotifyOn ? '1' : '0')
              } catch {
                // 忽略存储失败
              }
              showDialog(
                !turningOn
                  ? strings.feedback.sysNotifyOff
                  : granted
                    ? strings.feedback.sysNotifyOn
                    : strings.feedback.sysNotifyDenied,
              )
              reopenMenu('behavior')
            }
            // 只在用户主动打开时才申请权限，不在挂载时骚扰
            if (turningOn && Notification.permission === 'default') {
              void Notification.requestPermission().then((p) => commit(p === 'granted'))
              return
            }
            commit(Notification.permission === 'granted')
          })
        }
        appendMenuBtn(strings.panel.sedentary(sedentaryMin), () => {
          const i = SEDENTARY_CHOICES.indexOf(sedentaryMin as (typeof SEDENTARY_CHOICES)[number])
          sedentaryMin = SEDENTARY_CHOICES[(i + 1) % SEDENTARY_CHOICES.length]
          try {
            localStorage.setItem(SEDENTARY_KEY, String(sedentaryMin))
          } catch {
            // 忽略存储失败
          }
          startSedentary()
          showDialog(sedentaryMin === 0 ? strings.feedback.sedentaryOff : strings.feedback.sedentarySet(sedentaryMin))
          reopenMenu('behavior')
        })
        appendMenuBtn(strings.panel.back, backMore, 'pw-back')
        return
      }

      if (mode === 'rest') {
        appendMenuBtn(`🕐 ${strings.panel.in1h}`, () => {
          closeMenu()
          scheduleOnce(3600000)
          showDialog(strings.feedback.schedule1h)
        })
        appendMenuBtn(`🌙 ${strings.panel.daily}`, () => {
          closeMenu()
          scheduleDaily(22, 0)
          showDialog(strings.feedback.scheduleDaily)
        })
        appendMenuBtn(`🚫 ${strings.panel.cancelSchedule}`, () => {
          closeMenu()
          clearAutoHide()
          showDialog(strings.feedback.scheduleCancel)
        })
        appendMenuBtn(strings.panel.hide, () => {
          closeMenu()
          hideWhale()
        })
        appendMenuBtn(strings.panel.close, () => {
          closeMenu()
          quitWhale()
        })
        appendMenuBtn(strings.panel.back, backMore, 'pw-back')
      }
    }
    let lastMenuPos = { x: 0, y: 0 }
    const positionMenu = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect()
      const menuW = menu.offsetWidth || 140
      const menuH = menu.offsetHeight || 130
      const x = Math.min(Math.max(0, clientX - rect.left), Math.max(0, rect.width - menuW))
      // 下方空间不足时往上开，避免菜单项变多后超出视口底部
      const preferUp = clientY + menuH + 8 > window.innerHeight
      const y = preferUp ? clientY - rect.top - menuH - 10 : clientY - rect.top + 12
      const minY = -rect.top + 8
      const maxY = Math.max(minY, window.innerHeight - rect.top - menuH - 8)
      menu.style.left = `${x}px`
      menu.style.top = `${Math.min(Math.max(minY, y), maxY)}px`
    }
    const openMenu = (clientX: number, clientY: number) => {
      lastMenuPos = { x: clientX, y: clientY }
      buildMenu('main')
      menu.classList.add('open')
      positionMenu(clientX, clientY)
    }
    const closeMenu = () => menu.classList.remove('open')
    const onDocPointerDown = (e: PointerEvent) => {
      if (!menu.contains(e.target as Node)) closeMenu()
    }

// ===== 拖拽 =====
  let dragging = false
  let suppressClick = false

  // ===== 智能避让（不干扰抓取/拖拽/右键） =====
  // 只有 idle、光标在鲸鱼身外 48px 内停留 0.9s 才让开；
  // 光标进入身体、按下抓取或右键都会立即取消，并进入 8s 冷却。
  let avoidCooldownUntil = 0
  let avoidTimer: number | undefined
  const cancelAvoid = () => {
    window.clearTimeout(avoidTimer)
    avoidTimer = undefined
    root.style.transition = ''
  }
  const maybeAvoid = (e: MouseEvent) => {
    if (root.classList.contains('hidden') || dragging || menu.classList.contains('open') || visualState !== 'idle') return
    if (performance.now() < avoidCooldownUntil) return
    const rect = pet.getBoundingClientRect()
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
    if (inside) {
      cancelAvoid()
      return
    }
    const near = e.clientX >= rect.left - AVOID_MARGIN && e.clientX <= rect.right + AVOID_MARGIN
      && e.clientY >= rect.top - AVOID_MARGIN && e.clientY <= rect.bottom + AVOID_MARGIN
    if (!near) {
      cancelAvoid()
      return
    }
    if (avoidTimer !== undefined) return
    avoidTimer = window.setTimeout(() => {
      avoidTimer = undefined
      if (root.classList.contains('hidden') || dragging || menu.classList.contains('open') || visualState !== 'idle') return
      if (performance.now() < avoidCooldownUntil) return
      swimmer.interrupt()
      const r = pet.getBoundingClientRect()
      const insideNow = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      if (insideNow) return
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const len = Math.hypot(dx, dy) || 1
      const next = clampPos(cx - (dx / len) * AVOID_STEP - PET_W() / 2, cy - (dy / len) * AVOID_STEP - PET_H() / 2)
      root.style.transition = 'left .35s ease, top .35s ease'
      root.style.left = `${next.x}px`
      root.style.top = `${next.y}px`
      window.setTimeout(() => {
        root.style.transition = ''
        savePos()
      }, 380)
      showDialog(strings.feedback.avoid)
    }, AVOID_DWELL_MS)
  }

  // ===== idle 随机小动作 =====
  let idleMicroTimer: number | undefined
  const clearIdleMicro = () => {
    window.clearTimeout(idleMicroTimer)
    idleMicroTimer = undefined
  }
  const microLook = () => {
    const pupil = petPupil()
    if (pupil === null) return
    const dx = Math.random() * 0.4 - 0.2
    const dy = Math.random() * 0.3 - 0.15
    pupil.style.transition = 'transform .45s ease'
    pupil.style.transform = `translate(${dx}px, ${dy}px)`
    window.setTimeout(() => {
      pupil.style.transition = ''
      pupil.style.transform = ''
    }, 1500)
  }
  const microBubbles = () => {
    popBubble()
    window.setTimeout(popBubble, 260)
  }
  /** microSwim 的补间时长，也是"坐标不可信"的窗口 */
  const MICRO_SWIM_MS = 1450
  let microSwimUntil = 0
  const microSwim = (quiet = false) => {
    const ox = parseFloat(root.style.left) || 0
    const oy = parseFloat(root.style.top) || 0
    const target = clampPos(ox + (Math.random() * 200 - 100), oy + (Math.random() * 140 - 70))
    root.style.transition = 'left 1.4s ease-in-out, top 1.4s ease-in-out'
    root.style.left = `${target.x}px`
    root.style.top = `${target.y}px`
    // 补间期间 style.left 已是终点、鲸鱼还在半路，这段时间内谁读坐标都会读偏
    microSwimUntil = Date.now() + MICRO_SWIM_MS
    window.setTimeout(() => {
      root.style.transition = ''
      microSwimUntil = 0
      savePos()
    }, MICRO_SWIM_MS)
    if (!quiet && Math.random() < 0.35) showDialog(pick(strings.feedback.swim))
  }
  const scheduleIdleMicro = () => {
    clearIdleMicro()
    idleMicroTimer = window.setTimeout(() => {
      if (visualState !== 'idle' || root.classList.contains('hidden') || dragging || document.hidden || menu.classList.contains('open')) {
        scheduleIdleMicro()
        return
      }
      if (swimmer.isEnabled) {
        if (Math.random() < 0.5) microLook()
        else microBubbles()
      } else {
        const roll = Math.random()
        if (roll < 0.35) microSwim()
        else if (roll < 0.7) microLook()
        else microBubbles()
      }
      scheduleIdleMicro()
    }, 9000 + Math.random() * 8000)
  }

  // ===== 甩晕 =====
  /** 当前这条腿的方向，0 表示还没定下来 */
  let shakeDir = 0
  /** 这条腿的起点；同向移动时跟着推进，等于一路记住最远处 */
  let shakeLegFrom = 0
  let shakeCount = 0
  let shakeWindowFrom = 0
  /** 晕到什么时候为止，也当冷却用 */
  let shakenUntil = 0
  const resetShake = () => {
    shakeDir = 0
    shakeCount = 0
  }
  const triggerShaken = () => {
    const now = performance.now()
    if (now < shakenUntil) return
    shakeCount = 0
    shakenUntil = now + SHAKEN_MS + SHAKE_COOLDOWN_MS
    markActive()
    recordInteraction()
    pet.classList.remove('shaken', 'dizzy', 'squish', 'joy', 'annoyed')
    void pet.offsetWidth
    pet.classList.add('shaken')
    sounds.play('bubble')
    showDialog(pick(strings.feedback.shaken))
    // 后遗症：接下来一段时间游不直
    swimmer.setWoozy(SHAKEN_MS + WOOZY_MS)
    window.setTimeout(() => pet.classList.remove('shaken'), SHAKEN_MS)
  }
  /** 双击的专属反应：翻肚皮。翻着的时候不接别的动作，让这两秒完整演完 */
  let bellyUpUntil = 0
  const triggerBellyUp = () => {
    const now = performance.now()
    if (now < bellyUpUntil) return
    bellyUpUntil = now + BELLY_UP_MS
    markActive()
    recordInteraction()
    // 双击必然先来两次单击，连戳计数已经涨了；翻肚皮是亲昵不是骚扰，清掉
    pokeStreak = 0
    if (pokeDecayTimer !== 0) {
      window.clearTimeout(pokeDecayTimer)
      pokeDecayTimer = 0
    }
    if (sulking) clearSulk()
    pet.classList.remove('squish', 'dizzy', 'joy', 'annoyed', 'shaken')
    void pet.offsetWidth
    pet.classList.add('belly-up')
    sounds.play('trick')
    showDialog(pick(strings.feedback.bellyUp))
    window.setTimeout(() => pet.classList.remove('belly-up'), BELLY_UP_MS)
  }

  const trackShake = (x: number) => {
    const now = performance.now()
    const delta = x - shakeLegFrom
    const dir = Math.sign(delta)
    if (dir === 0) return
    if (shakeDir === 0) {
      // 还没起手：先等它朝某个方向走够距离，那才是第一条腿
      if (Math.abs(delta) >= SHAKE_MIN_LEG) {
        shakeDir = dir
        shakeLegFrom = x
      }
      return
    }
    if (dir === shakeDir) {
      shakeLegFrom = x
      return
    }
    // 掉头了，但得从最远处走回来足够多才算一次甩
    if (Math.abs(delta) < SHAKE_MIN_LEG) return
    shakeDir = dir
    shakeLegFrom = x
    if (now - shakeWindowFrom > SHAKE_WINDOW_MS) {
      shakeCount = 0
      shakeWindowFrom = now
    }
    shakeCount++
    if (shakeCount >= SHAKE_REVERSALS) triggerShaken()
  }

  let dragStart: { x: number; y: number; ox: number; oy: number } | null = null
  let longPressTimer: number | undefined
  let longPressTriggered = false
  const onPetPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return
    // 抓住/开始拖拽：立即停下避让动作与游动，并冷却一段时间，想抓就能抓住
    cancelAvoid()
    swimmer.interrupt()
    avoidCooldownUntil = performance.now() + AVOID_COOLDOWN_MS
    markActive()
    dragStart = {
      x: e.clientX,
      y: e.clientY,
      ox: parseFloat(root.style.left) || 0,
      oy: parseFloat(root.style.top) || 0,
    }
    resetShake()
    shakeLegFrom = e.clientX
    shakeWindowFrom = performance.now()
    // 严格保持抓取时的朝向，拖拽过程中不发生任何朝向突变
    root.dataset.facing = swimmer.currentFacing
    pet.setPointerCapture(e.pointerId)
      longPressTriggered = false
      window.clearTimeout(longPressTimer)
      longPressTimer = window.setTimeout(() => {
        longPressTriggered = true
        suppressClick = true
        triggerSquish()
        showDialog(strings.feedback.headpat)
        sounds.play('bubble')
      }, 700)
  }
  /**
   * 贴边挤扁。只在拖拽时判定——自己游到边上是贴着走，不是被人按上去的。
   * 台词有独立冷却，不然沿着边拖一路会一直喊。
   */
  let squeezeSaidAt = 0
  const updateEdge = (x: number, y: number) => {
    const maxX = Math.max(0, window.innerWidth - PET_W())
    const onLeft = x <= EDGE_SLACK
    const onRight = x >= maxX - EDGE_SLACK
    root.classList.toggle('edge-left', onLeft)
    root.classList.toggle('edge-right', onRight)
    if (!onLeft && !onRight) return
    const now = performance.now()
    if (now - squeezeSaidAt < 4000) return
    squeezeSaidAt = now
    showDialog(pick(strings.feedback.squeezed))
    swimmer.spawnDrip(x + (onLeft ? PET_W() * 0.18 : PET_W() * 0.82), y + PET_H() * 0.87)
  }
  const clearEdge = () => {
    root.classList.remove('edge-left', 'edge-right')
  }

  /** 拖着不放又不动：三秒后开始扭 */
  let dragIdleTimer = 0
  /** fresh=true 表示这是人动了手才重排的，扭动该停；续问时不能清，否则刚扭就被抹掉 */
  const armDragIdle = (fresh = true) => {
    if (dragIdleTimer !== 0) window.clearTimeout(dragIdleTimer)
    if (fresh) pet.classList.remove('impatient')
    dragIdleTimer = window.setTimeout(() => {
      if (!dragging) return
      pet.classList.add('impatient')
      showDialog(pick(strings.feedback.dragIdle))
      // 还不放手就继续问，但别太密
      armDragIdle(false)
    }, DRAG_IDLE_MS)
  }
  const disarmDragIdle = () => {
    if (dragIdleTimer !== 0) {
      window.clearTimeout(dragIdleTimer)
      dragIdleTimer = 0
    }
    pet.classList.remove('impatient')
  }

  let lastDripTime = 0
  const onPetPointerMove = (e: PointerEvent) => {
    if (dragStart === null) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    if (!dragging && Math.abs(dx) + Math.abs(dy) > 4) {
      dragging = true
      suppressClick = true
      root.classList.add('dragging')
      window.clearTimeout(longPressTimer)
      armDragIdle()
    }
    if (dragging) {
      const p = clampPos(dragStart.ox + dx, dragStart.oy + dy)
      root.style.left = `${p.x}px`
      root.style.top = `${p.y}px`

      trackShake(e.clientX)
      updateEdge(p.x, p.y)
      // 动了就说明人还在，重新开始数
      armDragIdle()

      const now = performance.now()
      if (now - lastDripTime > 380) {
        lastDripTime = now
        swimmer.spawnDrip(p.x + PET_W() / 2, p.y + PET_H() * 0.87)
      }
    }
  }
  const endDrag = () => {
    if (dragStart === null) return
    dragStart = null
    resetShake()
    disarmDragIdle()
    clearEdge()
    if (dragging) {
      dragging = false
      root.classList.remove('dragging')
      const px = parseFloat(root.style.left) || 0
      const py = parseFloat(root.style.top) || 0
      swimmer.spawnSplash(px + PET_W() / 2, py + PET_H() * 0.79, 4)
      swimmer.spawnWaterRipple(px + PET_W() / 2, py + PET_H() * 0.79, false)
      savePos()
      // 保持初始朝向不变
      root.dataset.facing = swimmer.currentFacing
      pet.style.transform = `scaleX(${swimmer.currentFacing === 'left' ? 1 : -1}) rotate(0deg)`
    }
    window.clearTimeout(longPressTimer)
    if (longPressTriggered) {
      longPressTriggered = false
      window.setTimeout(() => {
        suppressClick = false
      }, 300)
    } else {
      window.setTimeout(() => {
        suppressClick = false
      }, 0)
    }
  }

// ===== 打瞌睡 =====
  let sleepTimer: number | undefined
  let sleeping = false
  const markActive = () => {
    window.clearTimeout(sleepTimer)
    if (sleeping) {
      sleeping = false
      root.classList.remove('sleeping')
      pet.classList.add('spouting')
      window.setTimeout(() => pet.classList.remove('spouting'), 1400)
      showDialog(strings.feedback.wake)
      sounds.play('bubble')
    }
    sleepTimer = window.setTimeout(() => {
      if (visualState !== 'idle' || dragging) {
        markActive()
        return
      }
      sleeping = true
      root.classList.add('sleeping')
      showDialog(strings.feedback.sleep)
    }, SLEEP_MS)
  }
  const wake = () => {
    if (sleeping) {
      sleeping = false
      root.classList.remove('sleeping')
      pet.classList.add('spouting')
      window.setTimeout(() => pet.classList.remove('spouting'), 1400)
    }
  }

  // ===== 追光（rAF 节流） =====
  let eyeRaf = 0
  const onMouseMove = (e: MouseEvent) => {
    // 隐藏时不再追光，也不因鼠标移动唤醒台词
    if (root.classList.contains('hidden')) return
    markActive()
    // 躲避判定自带守卫，且不能被下面追光的 rAF 节流挡掉，所以放在 early-return 之前
    maybeAvoid(e)
    if (eyeRaf !== 0) return
    const pupil = petPupil()
    if (pupil === null) return
    eyeRaf = window.requestAnimationFrame(() => {
      eyeRaf = 0
      const rect = pet.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = Math.max(-0.18, Math.min(0.18, (e.clientX - cx) / 500))
      const dy = Math.max(-0.15, Math.min(0.15, (e.clientY - cy) / 450))
      pupil.style.transform = `translate(${dx}px, ${dy}px)`
    })
  }

  // ===== 事件绑定 =====
  pet.addEventListener('click', () => {
    if (suppressClick) return
    // 错误状态下点击：复制错误信息
    if (visualState === 'error' && lastErrorText !== '') {
      try {
        void navigator.clipboard?.writeText(lastErrorText)
      } catch {
        // 忽略剪贴板失败
      }
      showDialog(strings.feedback.errorCopied)
      return
    }

    // 失落时的一戳是安慰，不该被随机三选一顶掉
    if (visualState === 'disappointed' && driver.soothe()) {
      triggerComfort()
      return
    }

    markActive()
    bumpPokeStreak()

    // 已经闹上了：再戳只是火上浇油，不重置动画
    if (sulking) {
      recordInteraction()
      showDialog(pick(strings.feedback.pokeSulk))
      return
    }
    if (pokeStreak >= POKE_SULK_AT) {
      triggerSulk()
      return
    }
    if (pokeStreak >= POKE_ANNOYED_AT) {
      triggerAnnoyed()
      return
    }

    const rand = Math.random()
    if (rand < 0.65) {
      triggerSquish()
    } else if (rand < 0.85) {
      triggerRoll()
    } else {
      triggerDizzy()
    }
  })
  // 双击按关系深浅分流：翻肚皮是"完全放松"的姿势，
  // 只有处到形影不离才给你看，平时还是翻个跟头
  pet.addEventListener('dblclick', () => {
    if (currentTier() >= BOND_THRESHOLDS.length - 1) triggerBellyUp()
    else triggerRoll()
  })
  pet.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    // 右键也不许避让抢跑
    cancelAvoid()
    avoidCooldownUntil = performance.now() + AVOID_COOLDOWN_MS
    openMenu(e.clientX, e.clientY)
  })
  pet.addEventListener('pointerdown', onPetPointerDown)
  pet.addEventListener('pointermove', onPetPointerMove)
  pet.addEventListener('pointerup', endDrag)
  pet.addEventListener('pointercancel', endDrag)
  document.addEventListener('pointerdown', onDocPointerDown)
  document.addEventListener('keydown', markActive)
  document.addEventListener('wheel', markActive, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize)

  // ===== 会话状态订阅 =====
  // 0.1.5 起数据分两处（见 state.ts 文件头的字段对照）：
  //  - ctx.sessions → SessionFace：running / lastAgentError / openError
  //  - ctx.uiConversation → binding(...).target('chat') 的 ChatSnapshot.legacy：
  //    partial / runningCalls / turnEnds —— 这三个字段 0.1.5 的会话快照里没有
  const driver = new WhaleDriver()
  const sessions: ISessions | undefined = ctx.sessions
  const uiConversation = ctx.uiConversation
  let unsubList: (() => void) | undefined
  let unsubSession: (() => void) | undefined
  let unsubChat: (() => void) | undefined
  let face: SessionFace | undefined
  let chat: ChatSnapshot | undefined
  let prevSessionId: string | undefined = undefined
  let isFirstSessionSync = true

  /** 把两处订阅合成状态机需要的"最小快照面"。 */
  const composeSnapshot = (): WhaleSnapshot | undefined => {
    if (face === undefined) return undefined
    const session = face.getSnapshot()
    const legacy = chat?.legacy
    const partial = legacy?.partial ?? null
    return {
      running: session.running,
      partial,
      runningCalls: legacy?.runningCalls ?? [],
      partialToolCall: partialHasToolCall(partial),
      lastAgentError: session.lastAgentError,
      openError: session.openError,
      turnEnds: legacy?.turnEnds,
      // pending：0.1.5 的会话快照没有这个字段，也没有替代的公开读取面
      //（审批 / 提问的数据只在 slot 的 carrier 上，见 state.ts 文件头）。
      // 这里按老字段兜底读一次：宿主将来补上就自动生效，没有就是 undefined，
      // 绝不因为字段缺失而抛错。
      pending: (session as { pending?: readonly unknown[] }).pending,
    }
  }

  // 瞬态到点回落需要一个"没人推快照也要醒一次"的定时器。
  // 没有它：回合结束后快照不再更新 ⇒ step() 不再被调用 ⇒ celebrate 永远不停（实测 18.5s 以上）。
  let wakeTimer = 0
  const clearWake = () => {
    if (wakeTimer !== 0) {
      window.clearTimeout(wakeTimer)
      wakeTimer = 0
    }
  }
  const scheduleWake = () => {
    clearWake()
    const now = performance.now()
    const at = driver.nextDeadline(now)
    if (at === null) return
    // +24ms 是给 performance.now / setTimeout 之间的粒度差留的余量，避免差一毫秒又睡一轮
    wakeTimer = window.setTimeout(() => {
      wakeTimer = 0
      onSnapshot()
    }, Math.max(16, at - now + 24))
  }

  const onSnapshot = () => {
    const snapObj = composeSnapshot()
    if (snapObj === undefined) {
      clearWake()
      lastErrorText = ''
      setState('idle', visualState !== 'idle')
      updateTicker('')
      return
    }
    lastErrorText = snapObj.lastAgentError ?? (snapObj.openError != null ? 'open-error' : '')
    const step = driver.step(snapObj, performance.now())
    setState(step.state, step.changed)
    // 只有开关打开且真实状态是 think 时展示思考流；假装工作模式不展示
    updateTicker(tickerOn && step.state === 'think' ? partialTextOf(snapObj.partial) : '')
    scheduleWake()
  }
  const syncSession = () => {
    unsubSession?.()
    unsubChat?.()
    unsubSession = undefined
    unsubChat = undefined
    face = undefined
    chat = undefined
    const list = sessions.list.getSnapshot()
    const id = list.current
    if (id !== undefined && id !== prevSessionId && !isFirstSessionSync) {
      triggerWelcome()
    }
    prevSessionId = id
    isFirstSessionSync = false

    if (id === undefined) {
      onSnapshot()
      return
    }
    const binding = sessions.binding(id)
    if (binding === undefined) {
      onSnapshot()
      return
    }
    face = binding.session
    unsubSession = face.subscribe(onSnapshot)

    // 对话视图的 chat 投影：legacy 就是旧快照的 partial / runningCalls / turnEnds。
    // 契约上 target() 的第一次订阅会激活该 view。
    try {
      const target = uiConversation.binding(binding).target('chat')
      chat = target.getSnapshot()
      unsubChat = target.subscribe(() => {
        chat = target.getSnapshot()
        onSnapshot()
      })
    } catch {
      // 拿不到 chat 投影就退化成"没有工具/文本信号"：鲸鱼仍能 think / idle / celebrate，
      // 只是工具调用期间不切 working。绝不能让它把 apply 打断，那会整只鲸鱼消失。
      chat = undefined
    }
    onSnapshot()
  }

  if (sessions !== undefined) {
    unsubList = sessions.list.subscribe(syncSession)
    syncSession()
  }

  markActive()

  // ===== 恢复隐藏状态（跨刷新记忆） =====
  try {
    if (localStorage.getItem(HIDDEN_KEY) === '1') {
      root.classList.add('hidden')
      createMini()
    }
  } catch {
    // 忽略存储失败
  }

  // ===== 启动定时隐藏检查 =====
  startAutoHide()

      // ===== 语言切换监听 =====
    let localeUnsub: (() => void) | undefined
    const applyLocale = (nextLocale: PetLocale) => {
      if (locale === nextLocale) return
      locale = nextLocale
      strings = getStrings(locale, activePet.text?.[locale])
      pet.setAttribute('aria-label', strings.aria.petName(petDisplayName(activePet)))
      if (mini !== null) mini.setAttribute('aria-label', strings.aria.mini)
      syncMiniState(visualState)
      if (menu.classList.contains('open')) {
        buildMenu(menuMode)
        positionMenu(lastMenuPos.x, lastMenuPos.y)
      }
    }
    localeUnsub = localeService?.subscribe(() => {
      const nextLocale: PetLocale = localeService.getLocale().active === 'en' ? 'en' : 'zh'
      applyLocale(nextLocale)
    })

// ===== 清理 =====
  // ===== 主动搭话：只有形影不离档才会 =====
  const chatterTick = () => {
    if (currentTier() < BOND_THRESHOLDS.length - 1) return
    // 干活、睡着、被藏起来、正开着菜单、在闹脾气——都不是搭话的时候
    if (
      visualState !== 'idle' ||
      document.hidden ||
      sleeping ||
      sulking ||
      root.classList.contains(HIDDEN_CLASS) ||
      menu.classList.contains('open')
    ) {
      return
    }
    if (Math.random() > CHATTER_CHANCE) return
    showDialog(pick(strings.bond.chatter))
  }
  const chatterTimer = window.setInterval(chatterTick, CHATTER_TICK_MS)
  // 挂载时也对一次账：隔了很久再回来，该升的档得当场认出来
  checkBondUp()

  const dispose = () => {
    window.clearTimeout(sleepTimer)
    if (sedentaryTimer !== 0) window.clearInterval(sedentaryTimer)
    window.clearInterval(chatterTimer)
    if (dragIdleTimer !== 0) window.clearTimeout(dragIdleTimer)
    restoreTitle()
    if (pokeDecayTimer !== 0) window.clearTimeout(pokeDecayTimer)
    if (sulkTimer !== 0) window.clearTimeout(sulkTimer)
    window.clearTimeout(dialogTimer)
    if (eyeRaf !== 0) window.cancelAnimationFrame(eyeRaf)
    unsubList?.()
    unsubSession?.()
    unsubChat?.()
    clearWake()
    document.removeEventListener('pointerdown', onDocPointerDown)
    document.removeEventListener('keydown', markActive)
    document.removeEventListener('wheel', markActive)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    themeObserver.disconnect()
    clearIdleMicro()
    cancelAvoid()
    swimmer.dispose()
    if (autoHideTimer !== undefined) window.clearInterval(autoHideTimer)
    hideTicker()
    ticker.remove()
    removeMini()
    root.remove()
    style.remove()
    petStyle.remove()
  }
  quitWhale = dispose
  return dispose
}
