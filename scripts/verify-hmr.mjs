// verify-hmr：校验当前插件仓库与运行中 DSH 的 HMR 链路一致。
// 检查四件事：
//   1. 当前仓库的 dsh.client 产物存在（exports["./client"]）
//   2. DSH web profile 通过 link:/workspace 方式加载当前仓库（不是静态副本）
//   3. DSH 实际 serve 的 bundle 文件与当前仓库 lib/client.js 是同一个文件
//   4. /plugins/events 的 graph rev 等于本地文件内容 hash
// 用法：node scripts/verify-hmr.mjs [--profile web]
import { createHash } from 'node:crypto'
import { readFileSync, realpathSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const argProfile = process.argv.find((a) => a.startsWith('--profile='))?.split('=')[1]
const profile = argProfile ?? 'web'
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const name = pkg.name
const clientRel = pkg.exports?.['./client']
const clientPath = join(root, clientRel)

let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${extra ? `  — ${extra}` : ''}`)
  if (!ok) failures++
}

// 1. 构建产物存在
const hasClient = existsSync(clientPath)
check('client bundle 存在', hasClient, hasClient ? clientPath : `缺少 ${clientRel}`)

// 2. profile link 指向当前仓库
const dshHome = process.env.DSH_HOME ?? join(homedir(), '.dsh')
const profileDir = join(dshHome, 'profiles', profile)
const profilePkgPath = join(profileDir, 'package.json')
let linkOk = false
let linkDetail = 'profile package.json 不可读'
if (existsSync(profilePkgPath)) {
  const profilePkg = JSON.parse(readFileSync(profilePkgPath, 'utf8'))
  const dep = profilePkg.dependencies?.[name] ?? profilePkg.devDependencies?.[name] ?? ''
  const norm = (p) => p.replaceAll('/', sep).replace(/^[A-Za-z]:/, (m) => m.toUpperCase())
  const rootNorm = norm(root)
  if (typeof dep === 'string' && dep.startsWith('link:')) {
    const linkTarget = norm(dep.slice(5))
    linkOk = linkTarget.toLowerCase() === rootNorm.toLowerCase()
    linkDetail = `依赖声明 link:${dep.slice(5)}`
  } else {
    linkDetail = `依赖声明为 ${dep || '未找到'}`
  }
}

// 3. node_modules/<name> 的真实路径等于当前仓库（防御 import 解析不是 link 协议的情况）
const nmLink = join(profileDir, 'node_modules', name)
let realOk = false
let realDetail = 'node_modules 链接不可读'
try {
  const actual = realpathSync(nmLink)
  realOk = actual.toLowerCase() === root.toLowerCase()
  realDetail = `realpath → ${actual}`
} catch {
  realDetail = 'node_modules 下没有该包'
}

// 4. 本地 hash 与 DSH /plugins/events graph rev 一致
let hash = ''
let revOk = false
let revDetail = 'DSH 未运行或 /plugins/events 不可达'
if (hasClient) {
  hash = createHash('sha1').update(readFileSync(clientPath)).digest('hex').slice(0, 12)
}
const baseUrl = process.env.DSH_WEB_URL ?? 'http://127.0.0.1:3080'
const controller = new AbortController()
const timer = setTimeout(() => controller.abort(), 3000)
try {
  const res = await fetch(`${baseUrl}/plugins/events`, { signal: controller.signal })
  if (res.ok) {
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buf = ''
    let graphRev = null
    let done = false
    while (!done) {
      const { done: d, value } = await reader.read()
      if (d) break
      buf += decoder.decode(value, { stream: true })
      const match = buf.match(/data: (\{.*?\})\n\n/)
      if (match) {
        const frame = JSON.parse(match[1])
        if (frame.type === 'graph') {
          const row = frame.graph?.entries?.find((e) => e.id === name)
          graphRev = row?.rev ?? null
          done = true
        }
      }
    }
    if (graphRev) {
      revOk = graphRev === hash
      revDetail = `graph rev=${graphRev}，本地 hash=${hash}`
    }
  }
} catch {
  revDetail = 'DSH 未运行或 /plugins/events 不可达'
} finally {
  clearTimeout(timer)
}

check('profile link 指向当前仓库', linkOk, linkDetail)
check('node_modules realpath 指向当前仓库', realOk, realDetail)
check('DSH graph rev 与本地 bundle hash 一致', revOk, revDetail)

if (hasClient) {
  const st = statSync(clientPath)
  console.log(`\n${name} client bundle: ${clientPath}`)
  console.log(`  mtime: ${st.mtime.toISOString()}  size: ${st.size} B  hash: ${hash}`)
}
console.log(hasClient && linkOk && realOk && revOk ? '\nHMR 链路就绪。' : `\n${failures} 项不通过，先修再开发。`)
process.exit(failures === 0 ? 0 : 1)