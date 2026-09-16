// 多宠物静态预览：把 BASE_CSS + 每只宠物的 CSS/SVG 抽出来，铺成"宠物 × 状态"网格，
// 生成仓库根目录的 pet-preview.html，浏览器直接打开即可（不需要装进 DSH）。
//
// 用法：node scripts/preview-pets.mjs
// 换宠物/加宠物后重跑一次即可；截图命令见 docs/MULTI-PET.md。
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const client = join(root, 'src', 'client')

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
]

// 想多看几个状态就改这里：['宠物 id', '要挂的 class', '根上要挂的 class(可空)']
const cells = [
  ['whale', 'idle', ''], ['whale', 'working', ''], ['whale', 'celebrate', ''],
  ['cat', 'idle', ''], ['cat', 'working', ''], ['cat', 'celebrate', ''],
  ['cat', 'error', ''], ['cat', 'sleeping', ''], ['cat', 'belly-up', ''],
]

const cellHtml = cells
  .map(([id, state, rootState]) => {
    const pet = pets.find((p) => p.id === id)
    if (!pet) throw new Error(`预览里引用了没注册的宠物: ${id}`)
    const petClass = `pet-official ${state === 'sleeping' ? 'idle' : state}`
    return `<figure class="cell">
  <div data-dsh-whale class="${rootState}" style="--pw-scale:2.1">
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
console.log(`已生成 ${join(root, 'pet-preview.html')}（${pets.length} 只宠物 × ${cells.length} 个格子）`)
