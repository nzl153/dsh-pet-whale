// 多宠物静态预览：把 BASE_CSS + 每只宠物的 CSS/SVG 抽出来，铺成"宠物 × 状态"网格，
// 生成仓库根目录的 pet-preview.html，浏览器直接打开即可（不需要装进 DSH）。
//
// 用法：node scripts/preview-pets.mjs [--scale=3]     （默认 2.1×；挑造型细节时用 3~4×）
// 换宠物/加宠物后重跑一次即可；截图命令见 docs/MULTI-PET.md。
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const client = join(root, 'src', 'client')
/** 每格放大倍率，--scale=3 可覆盖（挑细节用） */
const SCALE = Number(process.argv.find((a) => a.startsWith('--scale='))?.slice('--scale='.length)) || 2.1

/** 取文件里唯一那个模板字符串的内容（这些文件都只有一个 `export const X = \`…\``）。 */
const tpl = (file) => {
  const s = readFileSync(file, 'utf8')
  const a = s.indexOf('`')
  const b = s.lastIndexOf('`')
  if (a < 0 || b <= a) throw new Error(`找不到模板字符串: ${file}`)
  return s.slice(a + 1, b)
}

const base = tpl(join(client, 'styles.ts'))
const pets = [
  { id: 'whale', html: tpl(join(client, 'whale.ts')), css: tpl(join(client, 'pets', 'whale', 'styles.ts')) },
  { id: 'cat', html: tpl(join(client, 'pets', 'cat', 'markup.ts')), css: tpl(join(client, 'pets', 'cat', 'styles.ts')) },
  // 竖版宠物：给它自己的盒子（预览页的 [data-dsh-whale] 默认是 137×101）
  {
    id: 'linger',
    html: tpl(join(client, 'pets', 'linger', 'markup.ts')),
    css: tpl(join(client, 'pets', 'linger', 'styles.ts')),
    box: { w: 87, h: 160 },
  },
]

// 想多看几个状态就改这里：['宠物 id', '要挂的 class', '根上要挂的 class(可空)']
const cells = [
  ['whale', 'idle', ''], ['whale', 'working', ''], ['whale', 'celebrate', ''],
  ['cat', 'idle', ''], ['cat', 'working', ''], ['cat', 'celebrate', ''],
  ['cat', 'error', ''], ['cat', 'sleeping', ''], ['cat', 'belly-up', ''],
  // 灵儿：多给几个状态，方便对着参考图挑造型
  ['linger', 'idle', ''], ['linger', 'think', ''], ['linger', 'working', ''], ['linger', 'celebrate', ''],
  ['linger', 'error', ''], ['linger', 'sleeping', ''], ['linger', 'belly-up', ''], ['linger', 'swimming', 'swimming'],
  // 原地动作（关闭御剑时的那套）：格子直接挂 micro-<id>，静态图停在动画中段看姿势
  ['linger', 'micro-spin', ''], ['linger', 'micro-spell', ''], ['linger', 'micro-fan', ''], ['linger', 'micro-gaze', ''],
]

/** --only=<宠物 id>：只画这一只（挑细节时用），默认全都画 */
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length)
/** --states=micro-sleeve,micro-collar：只画这些状态（挑单个动作/姿势时用） */
const STATES = process.argv
  .find((a) => a.startsWith('--states='))
  ?.slice('--states='.length)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const shownCells = cells
  .filter(([id]) => (ONLY ? id === ONLY : true))
  .filter(([, state]) => (STATES && STATES.length > 0 ? STATES.includes(state) : true))

const cellHtml = shownCells
  .map(([id, state, rootState]) => {
    const pet = pets.find((p) => p.id === id)
    if (!pet) throw new Error(`预览里引用了没注册的宠物: ${id}`)
    const petClass = `pet-official ${state === 'sleeping' ? 'idle' : state}`
    // 竖版宠物用 --pw-pet-w/--pw-pet-h 把根盒子改成它自己的尺寸（与插件运行时一致）
    const boxVars = pet.box ? `;--pw-pet-w:${pet.box.w}px;--pw-pet-h:${pet.box.h}px` : ''
    return `<figure class="cell">
  <div data-dsh-whale class="${rootState}" style="--pw-scale:${SCALE}${boxVars}">
    <span class="dsh-whale-shadow"></span>
    <span class="dsh-whale-wake"></span>
    <div class="dsh-whale-dialog"></div>
    <span class="dsh-whale-snack">🐟</span>
    <span class="dsh-whale-zzz">Zzz...</span>
    <div class="${petClass}" role="img" aria-label="${id}">${pet.html}</div>
    <div class="dsh-whale-menu"></div>
  </div>
  <figcaption>${id} · ${state}</figcaption>
</figure>`
  })
  .join('\n')

const html = `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>pet-whale 多宠物预览</title>
<style>
${base}
${pets.map((p) => p.css).join('\n')}
/* ---- 预览专用覆盖：把固定定位的桌宠摆进网格 ---- */
body { margin: 0; background: #F7F2E6; font-family: -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif; }
#stage { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 16px; padding: 12px; }
.cell { margin: 0; display: flex; flex-direction: column; align-items: center; }
.cell [data-dsh-whale] { position: relative !important; right: auto !important; bottom: auto !important; left: auto !important; top: auto !important; }
/* 静态截图会停在动画 0% 相位，整体往前挪半秒才看得到跃起/翻滚/喷气的中间姿势 */
.cell * { animation-delay: -0.55s !important; }
.cell figcaption { margin-top: 6px; font-size: 12px; color: #6b6157; }
</style></head>
<body><div id="stage">${cellHtml}</div></body></html>`

writeFileSync(join(root, 'pet-preview.html'), html, 'utf8')
console.log(`已生成 ${join(root, 'pet-preview.html')}（${pets.length} 只宠物 × ${shownCells.length} 个格子，${SCALE}×）`)
