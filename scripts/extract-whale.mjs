// 从 preview.html 抽取 V2（官方轮廓版）鲸鱼 DOM，生成 src/client/whale.ts。
// 用法：node scripts/extract-whale.mjs [--check]
//   --check 只比较不写（供 pnpm doctor 用）
// 修改预览模板后重跑一次即可同步插件。
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
mkdirSync(join(root, 'src', 'client'), { recursive: true })
const html = readFileSync(join(root, 'preview.html'), 'utf8')

const startMark = '<div class="pet-official idle" id="pet2">'
const start = html.indexOf(startMark)
if (start === -1) throw new Error('preview.html 里找不到 V2 容器 pet2')
const innerStart = start + startMark.length
const end = html.indexOf('</div>', innerStart)
if (end === -1) throw new Error('V2 容器没有闭合 </div>')
let inner = html.slice(innerStart, end).trim()

// 身体色换成 CSS 变量（配合 src/client/palettes.ts 换肤）。
// SVG 展示属性（fill/stop-color）不支持 var()，改成 style 属性。
// 只动身体渐变三档 + 腮红 + 键盘/代码粒子里的身体色，肚皮/眼睛/星星不动。
// 注意：色值要与 preview.html 当前模板一致（现在是主题蓝默认值）。
const colorVars = [
  ['#8FB5FF', '--pw-body-light'],
  ['#4D6BFE', '--pw-body'],
  ['#3550C9', '--pw-body-dark'],
  ['#F0A0A0', '--pw-blush'],
]
for (const [hex, varName] of colorVars) {
  inner = inner.replace(
    new RegExp(`(stop-color|fill)="${hex}"`, 'g'),
    `style="$1:var(${varName},${hex})"`,
  )
}

// 眼睛与墨色描边：深色皮肤可反白
inner = inner.replace('r="1.25" fill="#2E2A24"', 'r="1.25" style="fill:var(--pw-eye,#2E2A24)"')
inner = inner.replace('r="0.42" fill="#FBF8F0"', 'r="0.42" style="fill:var(--pw-pupil,#FBF8F0)"')
inner = inner.replace(/stroke="#2E2A24"/g, 'stroke="var(--pw-eye,#2E2A24)"')

// 模板字符串安全：内容里不允许有反引号或 ${（当前 SVG 都没有，出现就报错停下）
if (inner.includes('`') || inner.includes('${')) {
  throw new Error('抽取内容含模板字符串冲突字符，需要转义')
}

const outPath = join(root, 'src', 'client', 'whale.ts')
const next =
  `// 由 scripts/extract-whale.mjs 从 preview.html 自动生成，勿手改。\n` +
  `// 改预览模板后重跑：node scripts/extract-whale.mjs\n` +
  `export const WHALE_HTML = \`${inner}\`\n`

// --check：只比较不写，供 pnpm pet:doctor 用来发现"preview.html 与 whale.ts 漂移"
// 两侧都归一化行尾再比：preview.html 是 CRLF，而 git 里存的是 LF（core.autocrlf=true）
if (process.argv.includes('--check')) {
  const cur = existsSync(outPath) ? readFileSync(outPath, 'utf8') : ''
  const same = cur.replace(/\r\n/g, '\n') === next.replace(/\r\n/g, '\n')
  console.log(same ? 'OK  whale.ts 与 preview.html 的 V2 一致' : 'DIFF  whale.ts 与 preview.html 的 V2 不一致（跑 node scripts/extract-whale.mjs 重新生成）')
  process.exit(same ? 0 : 1)
}

writeFileSync(outPath, next, 'utf8')
console.log(`whale.ts 生成完成：${inner.length} 字符`)
