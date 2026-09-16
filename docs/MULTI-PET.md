# 多宠物 & 自定义皮肤

本分支在原插件基础上把"外形"抽成了可插拔的宠物模块：**每只宠物自带 SVG 和独立的动画样式表**，
右键菜单里可以随时切换，选择记在 `localStorage['pet-whale:pet']`。
原有的行为逻辑（状态机、拖拽物理、游动、粒子、菜单、统计、多语言）**一行没改**。

## 三层定制，按投入从小到大

| 想要的效果 | 要改什么 | 投入 |
|---|---|---|
| 换颜色 | `src/client/palettes.ts` 加一行色板，或用现成的 7 套 | 1 分钟 |
| 加一只新宠物（自己的 SVG + 自己的动画） | 新建 `src/client/pets/<id>/` 一个目录 + `pets/index.ts` 注册一行 | 半天起 |
| 让宠物对某个状态有专属反应 | 在**该宠物自己的** `styles.ts` 里加规则 + `cat-*` 之类的 keyframes | 按需 |

已有的两只：`whale`（原来的小鲸鱼）与 `cat`（小猫，作为扩展范例）。

## 目录结构

```
src/client/
  index.ts                 逻辑（多宠物改造只动了 6 处：样式注入、DOM、applyPet、菜单、aria、导入）
  styles.ts                BASE_CSS：与宠物无关的公共样式 + 全部 @keyframes（pw-*）
  whale.ts                 鲸鱼 SVG（由 scripts/extract-whale.mjs 从 preview.html 生成）
  pets/
    types.ts                PetModule 接口 + 三条约定（读它就够写一只新宠物）
    index.ts                PETS 注册表 / DEFAULT_PET_ID / 选择持久化
    whale/{index.ts,styles.ts}    鲸鱼模块 + 宠物私有样式（从 styles.ts 切分而来）
    cat/{index.ts,styles.ts,markup.ts}   小猫模块：手写 SVG + 独立 cat-* 动画
```

运行时挂**两张** `<style>`：

- `#pet-whale-style` = `BASE_CSS`（常驻）；
- `#pet-whale-pet-style` = **当前宠物**的 `css`，切换时整段替换。

所以两只宠物的选择器与 keyframes 永远不会同时存在，宠物之间不存在"串味"的可能，
宠物样式表内部也因此**不需要**再加宠物前缀。

## 加一只新宠物：三步

### 1. 建目录，写 SVG

`src/client/pets/fox/markup.ts`：

```ts
export const FOX_HTML = `<svg viewBox="0 0 26 19" aria-hidden="true">
  <g class="body">…</g>
</svg>
<span class="bubble"></span><span class="bubble b2"></span><span class="bubble b3"></span>
<span class="bubble-blue"></span><span class="bubble-blue bb2"></span><span class="bubble-blue bb3"></span>`
```

结尾那 6 个 `<span>` 是说话气泡，和鲸鱼一样是**绝对定位在容器上的 HTML 元素**，不是 SVG 内容。

### 2. 写这只宠物的样式

`src/client/pets/fox/styles.ts`：写 `.pet-official.<状态> …` 规则 + 自己前缀的 `@keyframes`。

```ts
export const FOX_PET_CSS = `
[data-dsh-whale] .pet-official .body { animation: fox-breathe 3.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .keyboard-unit { display: block !important; }
@keyframes fox-breathe { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-1.4px) } }
`
```

### 3. 注册

`src/client/pets/fox/index.ts`：

```ts
import type { PetModule } from '../types'
import { FOX_HTML } from './markup'
import { FOX_PET_CSS } from './styles'

export const foxPet: PetModule = {
  id: 'fox',
  name: { zh: '小狐狸', en: 'Fox' },
  icon: '🦊',
  html: FOX_HTML,
  css: FOX_PET_CSS,
}
```

`src/client/pets/index.ts`：

```ts
import { foxPet } from './fox'
export const PETS: readonly PetModule[] = [whalePet, catPet, foxPet]
```

名字想跟语言走，就在 `src/client/i18n.ts` 的 `zh.pet` / `en.pet` 里加 `fox: '小狐狸' / 'Fox'`；
不加也会自动回落到 `PetModule.name`，不会显示空白。

## 三条约定（照做就不会踩坑）

1. **上色只用 CSS 变量**：`--pw-body` / `--pw-body-light` / `--pw-body-dark` / `--pw-blush` /
   `--pw-eye` / `--pw-pupil`。这样 `palettes.ts` 里 7 套色板对所有宠物自动生效，换肤不用改一行代码。
   注意 SVG 展示属性不支持 `var()`，要写成 `style="fill:var(--pw-body,#4D6BFE)"`。
2. **keyframes 用自己前缀**：`BASE_CSS` 里已经有全部 `pw-*`（鲸鱼和公共特效在用），
   新宠物请用 `fox-*` 之类，别重名。
3. **容器尺寸与比例**：容器默认 137×101 px（乘 `--pw-scale`）。viewBox 比例贴近鲸鱼的
   `-2 -1 26 19`（≈1.37:1）最省事；差得多就声明 `size: { w, h }`，插件会写进
   `--pw-pet-w/--pw-pet-h`，贴边挤扁、水花位置、碰撞边界都跟着走。

## 状态 class 契约

插件只负责给容器加/去 class，宠物用 CSS 响应即可。**没实现的 class 不会报错，只是没反应。**

| class | 加在哪 | 什么时候 | 备注 |
|---|---|---|---|
| `idle` `think` `working` `celebrate` `error` `wait` `disappointed` | `.pet-official` | 主状态机，互斥 | `think` = 回合中无工具，`working` = 有工具调用 |
| `joy` `squish` `dizzy` `rolling` `belly-up` `annoyed` `sulking` `shaken` `welcome` `impatient` `spouting` | `.pet-official` | 互动/瞬时反应 | 到时自动移除（如 `joy` 1.1s、`belly-up` 2s） |
| `swimming` `swim-dive` `swimming-dive` | `.pet-official` | 自主巡游 | 由 `swim.ts` 驱动 |
| `sleeping` `dragging` `edge-left` `edge-right` `hidden` `paused` `swimming` | 根 `[data-dsh-whale]` | 全局状态 | `hidden`/`paused` 由 BASE_CSS 处理 |
| `data-facing="right"` | 根 | 拖拽/游动朝向 | 需要翻转时自己写 `[data-facing="right"]` 规则 |

宠物 SVG 里可选提供的部件（`cat` 与 `whale` 用的是同一套 class，可以直接对照抄）：

| class | 用途 |
|---|---|
| `.body` | 身体主体：待机呼吸、贴边挤扁、睡觉起伏都作用在它上面 |
| `.eye-group` → `.eye` / `.pupil-highlight` / `.caught-eyes` / `.sleep-eyes` / `.dizzy-eyes` / `.angry-eyes` | 眨眼、追光瞳孔（`pupil-highlight` 是**唯一**被 JS 直接引用的部件）、被抓 `>_<`、眯笑、晕眩、吊眉 |
| `.angry` | 报错时的青筋/尴尬黑线 |
| `.stars` → `.starL` / `.starR` | 欢迎/庆祝的星星。注意 SVG 里若写了内联 `display:none`，显示规则必须用 `!important` 才压得住 |
| `.spout-group` → `.spout-stream` / `.spout-drop` | 醒来/庆祝的喷气（猫用作小喷气） |
| `.code-particle` → `.code-fx1` / `.code-fx2` | working 时飘起的代码粒子 |
| `.keyboard-unit` → `.tap-k1` / `.tap-k2` | working 时出现的键盘和敲键的爪子 |

`pupilSelector` 可以在 `PetModule` 里换成别的选择器（默认 `.pupil-highlight`）。

## 调试与验证

- **静态预览**（不用装进 DSH）：仓库根目录运行

  ```sh
  node scripts/preview-pets.mjs      # 生成 pet-preview.html：所有宠物 × 多状态铺成网格
  ```

  浏览器直接打开 `pet-preview.html` 就能看；要截图留档（Windows 有 Chrome 时）：

  ```powershell
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu `
    --user-data-dir="$env:TEMP\chrome-pet" --hide-scrollbars --virtual-time-budget=4000 `
    --window-size=1200,900 --screenshot="pet-preview.png" "file:///$PWD/pet-preview.html"
  ```

  `--virtual-time-budget` 调小（如 700）能看到"翻肚皮/跳跃"这类一次性动画的中间姿势；
  默认截到的是动画 0% 相位。

- **单元/冒烟测试**：`pnpm test`（jsdom）。已覆盖默认宠物、菜单切换、样式表整段替换、
  容器状态类保留、`pet-whale:pet` 记忆、dispose 清理。
- **类型**：`pnpm typecheck`。

## 怎么确认没有动坏鲸鱼

`BASE_CSS` 里不应该再出现任何宠物私有选择器。一条 grep 就能验收：

```powershell
Select-String -Path src\client\styles.ts -Pattern '\.pet-official\.' -AllMatches   # 期望：0 条
```

（`styles.ts` 里允许保留 `.pet-official { }` / `.pet-official svg { }` / `.pet-official:active` 这三条
容器级规则，它们对所有宠物通用。）

## 回滚

```powershell
git checkout main                 # 或 git checkout 1.1.0 对应的 tag
pnpm build
dsh plugin --profile web add pet-whale@1.1.0   # 换回 registry 版本
```
