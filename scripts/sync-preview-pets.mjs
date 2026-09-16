// 把 src/ 里的宠物资产同步进手写的 preview.html（预览设计台）：
//   1) 每只宠物的内联 SVG  →  .stage 里一个 <div data-dsh-whale id="pet-<id>"> 容器（默认隐藏）
//   2) 每只宠物的私有 CSS  →  <head> 里一个 <style id="pet-<id>-css">
//   3) 每只宠物的文案覆盖  →  window.__PET_UI__（预览页把它叠在自带文案上，切宠物就换说法）
//
// 为什么这样设计：
//   - preview.html 里手写的 V1（Q 版）/ V2（官方轮廓版）始终是**鲸鱼的设计稿**，
//     也是 scripts/extract-whale.mjs 的抽取源，不能改成生成物；其余宠物由本脚本注入。
//   - 注入的 CSS 保留源文件里的 [data-dsh-whale] 前缀，特异性天然高于预览页里
//     无前缀的 .pet-official 规则，所以不需要给预览页动 CSS 手术就能共存。
//
// 用法：node scripts/sync-preview-pets.mjs     （加宠物后 / 改完宠物样式后重跑）
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const client = join(root, 'src', 'client')
const PREVIEW = join(root, 'preview.html')

/** 取文件里唯一那个模板字符串的内容（`export const X = \`…\``）。 */
const tpl = (file) => {
  const s = readFileSync(file, 'utf8')
  const a = s.indexOf('`')
  const b = s.lastIndexOf('`')
  if (a < 0 || b <= a) throw new Error(`找不到模板字符串: ${file}`)
  return s.slice(a + 1, b)
}

/** 直接执行一个纯数据的 TS 模块（只有 import / 类型标注），拿到它的导出对象。 */
const dataOf = (file, exportName) => {
  const src = readFileSync(file, 'utf8')
    .replace(/^\s*import\s.*$/gm, '')
    .replace(/:\s*PetTextOverrides/g, '')
    .replace(/^export\s+/gm, '')
  // eslint-disable-next-line no-new-func
  return new Function(`${src}\nreturn ${exportName}`)()
}

/** 宠物目录清单：加一只宠物就在这里加一行（与 src/client/pets/index.ts 对应）。 */
const PET_DIRS = ['cat']

const pets = PET_DIRS.map((id) => {
  const dir = join(client, 'pets', id)
  const meta = readFileSync(join(dir, 'index.ts'), 'utf8')
  const nameZh = /zh:\s*'([^']+)'/.exec(meta)?.[1] ?? id
  const nameEn = /en:\s*'([^']+)'/.exec(meta)?.[1] ?? id
  const icon = /icon:\s*'([^']+)'/.exec(meta)?.[1] ?? '🐾'
  const text = dataOf(join(dir, 'text.ts'), 'CAT_TEXT')
  const toPageDict = (t) => ({
    // 预览页自己的键名（见 preview.html 里的 i18n 对象）
    ...(t.status ? { status: t.status } : {}),
    ...(t.bond?.poke?.[1] ? { poke: t.bond.poke[1] } : {}),
    ...(t.bond?.welcome?.[1] ? { welcomeText: t.bond.welcome[1] } : {}),
    ...(t.feedback?.pokeDizzy ? { pokeDizzy: t.feedback.pokeDizzy } : {}),
    ...(t.feedback?.joy ? { joy: t.feedback.joy } : {}),
    ...(t.feedback?.feed ? { feedText: t.feedback.feed } : {}),
    ...(t.feedback?.headpat ? { headpatText: t.feedback.headpat } : {}),
    ...(t.feedback?.roll ? { rollText: t.feedback.roll } : {}),
    ...(t.feedback?.wake ? { wakeText: t.feedback.wake } : {}),
    ...(t.feedback?.sleep ? { sleepText: t.feedback.sleep } : {}),
    ...(t.feedback?.swim ? { swimQuotes: t.feedback.swim } : {}),
    ...(t.feedback?.swimOn ? { swimOnMsg: t.feedback.swimOn } : {}),
    ...(t.feedback?.swimOff ? { swimOffMsg: t.feedback.swimOff } : {}),
  })
  return {
    id,
    icon,
    nameZh,
    nameEn,
    html: tpl(join(dir, 'markup.ts')),
    css: tpl(join(dir, 'styles.ts')),
    ui: {
      zh: {
        modeLabels: { [id]: `${icon} ${nameZh}` },
        title: `${icon} 桌宠${nameZh} · 预览`,
        hint: `提示：单击${nameZh}触发撒娇/翻滚/晕乎互动；双击翻滚；晃动鼠标灵动追光；长时间无操作自动打瞌睡。`,
        ...toPageDict(text.zh),
      },
      en: {
        modeLabels: { [id]: `${icon} ${nameEn}` },
        title: `${icon} Desktop Pet ${nameEn} · Preview`,
        hint: `Tip: click the ${nameEn.toLowerCase()} for pokes/rolls; double-click to roll; move the mouse to follow; it naps when idle.`,
        ...toPageDict(text.en),
      },
    },
  }
})

let html = readFileSync(PREVIEW, 'utf8')
// 仓库是 core.autocrlf=true，工作区里的 preview.html 是 CRLF；锚点与插入内容都要跟着走
const EOL = html.includes('\r\n') ? '\r\n' : '\n'
const eol = (s) => s.split('\n').join(EOL)

/**
 * 有标记就**原地**替换标记之间的内容（位置稳定，反复运行字节级一致）；
 * 没有标记（第一次同步）才按 mode 插到 anchor 的后/前面。
 */
function upsert(text, tag, block, anchor, mode = 'after') {
  const begin = `<!-- ${tag}:begin -->`
  const end = `<!-- ${tag}:end -->`
  const wrapped = `${begin}${EOL}${eol(block)}${EOL}${end}`
  const from = text.indexOf(begin)
  if (from !== -1) {
    const to = text.indexOf(end, from)
    if (to === -1) throw new Error(`preview.html 里 ${tag} 只有开始标记`)
    return text.slice(0, from) + wrapped + text.slice(to + end.length)
  }
  const at = text.indexOf(eol(anchor))
  if (at === -1) throw new Error(`preview.html 里找不到锚点: ${anchor.slice(0, 40)}`)
  const insertAt = mode === 'before' ? at : at + eol(anchor).length
  const gap = mode === 'before' ? `${wrapped}${EOL}` : `${EOL}${wrapped}`
  return text.slice(0, insertAt) + gap + text.slice(insertAt)
}

// 1) 宠物私有 CSS：放在 </head> 前，整块由本脚本维护
const cssBlock = pets
  .map((p) => `<style id="pet-${p.id}-css">\n/* 由 scripts/sync-preview-pets.mjs 生成，勿手改（改 src/client/pets/${p.id}/styles.ts） */\n${p.css}</style>`)
  .join('\n')
html = upsert(html, 'pet-css', cssBlock, '</style>')

// 2) 宠物承载节点：插在 V2 鲸鱼容器之后（用鲸鱼独有的 bubble-blue 结尾做锚点）
const nodeBlock = pets
  .map(
    (p) => `      <div data-dsh-whale id="pet-${p.id}" data-preview-pet="${p.id}" style="display:none">
        <!-- 由 scripts/sync-preview-pets.mjs 生成，勿手改（改 src/client/pets/${p.id}/markup.ts） -->
        <div class="pet-official idle">${p.html}</div>
      </div>`,
  )
  .join('\n')
html = upsert(html, 'pet-nodes', nodeBlock, '        <span class="bubble-blue bb3"></span>\n      </div>')

// 3) 文案数据：必须在主 <script> **之前**（插到后面会被当成脚本正文，整页塌掉）
//    JSON 里的 '<' 转成 \u003c，避免台词里出现 </script 之类把标签提前闭合
const json = (v) => JSON.stringify(v, null, 2).replaceAll('<', '\\u003c')
const uiBlock = `<script id="pet-ui-data">
  // 由 scripts/sync-preview-pets.mjs 生成：宠物模块清单 + 该宠物的文案覆盖
  window.__PET_MODULES__ = ${json(pets.map((p) => ({ id: p.id, baseClass: 'pet-official' })))};
  window.__PET_UI__ = ${json(Object.fromEntries(pets.map((p) => [p.id, p.ui])))};
</script>`
html = upsert(html, 'pet-ui-data', uiBlock, '<script>', 'before')

// 4) 宠物切换按钮：插在 V2 那个手写按钮之后（标签由 __PET_UI__.modeLabels 在 applyLanguage 里覆盖）
const modeBtnBlock = pets
  .map((p) => `    <button data-m="${p.id}">${p.icon} ${p.nameZh}</button>`)
  .join('\n')
html = upsert(html, 'pet-mode-buttons', modeBtnBlock, '<button data-m="v2" class="active">官方轮廓版</button>')

writeFileSync(PREVIEW, html, 'utf8')
console.log(`已同步 ${pets.length} 只宠物到 preview.html：${pets.map((p) => p.id).join(', ')}`)
