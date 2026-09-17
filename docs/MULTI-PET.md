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
  index.ts                 逻辑（多宠物改造只动了 7 处：样式注入、DOM、applyPet、菜单、文案重算、aria、导入）
  styles.ts                BASE_CSS：与宠物无关的公共样式 + 全部 @keyframes（pw-*）
  i18n.ts                  基准文案（鲸鱼口吻）+ PetTextOverrides / getStrings(locale, overrides)
  whale.ts                 鲸鱼 SVG（由 scripts/extract-whale.mjs 从 preview.html 生成）
  pets/
    types.ts                PetModule 接口 + 三条约定（读它就够写一只新宠物）
    index.ts                PETS 注册表 / DEFAULT_PET_ID / 选择持久化
    whale/{index.ts,styles.ts}          鲸鱼模块 + 宠物私有样式（从 styles.ts 切分而来）
    cat/{index.ts,styles.ts,markup.ts,text.ts}   小猫：手写 SVG + 独立 cat-* 动画 + 专属台词
    linger/{index.ts,markup.ts,styles.ts,text.ts} 灵儿：Q 版 3 头身人物 + 竖版盒子（size）
scripts/
  sync-preview-pets.mjs     把宠物资源注入手写的 preview.html（pnpm sync:preview）
  preview-pets.mjs          生成"全部宠物 × 全部状态"检查页（pnpm preview）
  extract-whale.mjs         从 preview.html 抽 V2 鲸鱼 SVG → src/client/whale.ts
  doctor.mjs                改造体检（pnpm pet:doctor）
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

### 4. 换它说的话（强烈建议）

`i18n.ts` 里的基准文案是**鲸鱼口吻**："正在深潜检索知识库...""游一游，活动一下~"。
一只猫说这些很违和，所以宠物可以整组覆盖它 —— 见下一节。

### 5. 让预览页也认识它（两步，别漏）

```powershell
# ① scripts/sync-preview-pets.mjs 顶部的 PET_DIRS 里加一行：const PET_DIRS = ['cat', 'linger']
pnpm sync:preview
```

`pnpm pet:doctor` 和 `pnpm sync:preview --check` 都会在你忘记同步时直接报错，所以漏了也不会静默。

## 人物型宠物：竖版盒子与专属配色变量

两个只在"人物/大体量宠物"上才会用到的东西，`pets/linger` 是范例：

**(1) 竖版盒子 `size`** —— 默认容器是 137×101（横的），站立人物塞进去会被压扁：

```ts
export const lingerPet: PetModule = {
  // …
  size: { w: 104, h: 140 },   // 插件写进 --pw-pet-w/--pw-pet-h，贴边挤扁、巡游范围、地面阴影都跟着走
}
```

配套要做两件事，否则比例对不上：

- `viewBox` 的长宽比要与 `size` 一致（灵儿是 26×35 ↔ 104×140）；
- 地面阴影是固定像素的，要在宠物自己的样式表里覆盖：
  `[data-dsh-whale][data-pet="linger"] .dsh-whale-shadow { … }`
- 预览页那边由 `scripts/sync-preview-pets.mjs` 自动加行内尺寸（它读 `index.ts` 里的 `size`）。

**(2) 专属配色变量** —— 色板只给了 `--pw-body/--pw-body-light/--pw-body-dark/--pw-blush`
四个槽位。灵儿的造型是"白袍 + 蓝 + 红腰带"，白袍必须保持白，所以在她的样式表里加了两个局部变量：

```css
[data-dsh-whale] {
  --pw-robe: #F7F9FC;        /* 白袍主色，跟着宠物表只在选中时存在 */
  --pw-robe-shade: #E4EAF2;
}
```

SVG 里 `style="stop-color:var(--pw-robe,#F7F9FC)"` 用它，于是换肤时**蓝色与红色跟着色板走、白袍保持白**。
加新宠物时想加自己的槽位，照这个写法在宠物样式表里定义即可（不需要动 BASE_CSS）。

## 台词也跟着宠物走

机制很小：`PetModule.text` 是一份"只写要改的条目"的覆盖对象，运行时通过
`getStrings(locale, pet.text?.[locale])` 叠在基准文案上（对象逐层合并，**数组整组替换**）。
切宠物时 `applyPet` 会重算 `strings`，所以台词、a11y 文案、通知文案立刻跟着换。

`src/client/pets/cat/text.ts` 就是范例：

```ts
export const CAT_TEXT = {
  zh: {
    status: { think: ['正盯着屏幕梳理线索... 🔍', '让我想想这一步该怎么走…'] },
    panel: { swim: '🐾 巡逻' },                      // 自主巡游对猫叫"巡逻"
    feedback: { sleep: '呼噜噜... 蜷成一团，做小鱼干的梦 (Zzz) 💤' },
  },
  en: { /* 同样的键，英文一套 */ },
}
```

值得按宠物改的条目（都是基准文案里带"水/鲸/深潜"味道的）：

| 键 | 基准（鲸鱼） | 猫的版本 |
|---|---|---|
| `status.*` | 正在深潜检索知识库 | 正盯着屏幕梳理线索 |
| `panel.swim` | 🏊 游泳 | 🐾 巡逻 |
| `feedback.swim[]` / `swimOn` / `swimOff` | 游一游、深潜探索海底世界 | 溜达一圈、巡视领地 |
| `feedback.sleep` | 正在做深海美梦 | 蜷成一团，做小鱼干的梦 |
| `feedback.shaken[]` | 我要吐泡泡了 | 我要吐毛球了 |
| `feedback.restNudge[]` | 深海也需要浮上来换气 | 猫都睡一轮了，你也歇会儿 |
| `feedback.pokeAnnoyed[]` | 再戳我就要游走咯 | 再戳我就要跑开咯 |
| `bond.poke[1]` / `bond.welcome` / `bond.chatter` | 软软的肚皮 / 拍拍水 / 冒个泡 | 呼噜呼噜 / 尾巴扫了扫 / 喵一声 |
| `aria.mini` / `aria.miniTitle` | 显示桌宠小鲸鱼 | 显示桌宠小猫 |

两条注意：

- **数组要整组给**：只给 `['第一条']` 会把整个台词池换成一条，不会与鲸鱼的句子混合（故意的）。
- 没覆盖到的条目自动沿用基准，所以可以先把 `status` 换掉，其余以后再补。

小猫的完整覆盖见 `src/client/pets/cat/text.ts`（中英各一套）。冒烟测试里有两条断言盯着它：
"小猫的思考台词是猫口吻""小猫不会说深潜"，以及切回鲸鱼后台词恢复基准。

## 四条约定（照做就不会踩坑）

1. **上色只用 CSS 变量**：`--pw-body` / `--pw-body-light` / `--pw-body-dark` / `--pw-blush` /
   `--pw-eye` / `--pw-pupil`。这样 `palettes.ts` 里 7 套色板对所有宠物自动生效，换肤不用改一行代码。
   注意 SVG 展示属性不支持 `var()`，要写成 `style="fill:var(--pw-body,#4D6BFE)"`。
2. **keyframes 用自己前缀**：`BASE_CSS` 里已经有全部 `pw-*`（鲸鱼和公共特效在用），
   新宠物请用 `fox-*` 之类，别重名。
3. **容器尺寸与比例**：容器默认 137×101 px（乘 `--pw-scale`）。viewBox 比例贴近鲸鱼的
   `-2 -1 26 19`（≈1.37:1）最省事；差得多就声明 `size: { w, h }`，插件会写进
   `--pw-pet-w/--pw-pet-h`，贴边挤扁、水花位置、碰撞边界都跟着走。
4. **第三方 IP 要写声明**：宠物若基于动漫/游戏角色，在 `NOTICE.md` 补一段
   （原型作品、权利人、非商业、可移除），并在 README「声明」里加一行；
   而且**不要把原作素材放进仓库**，自己重画成 SVG/CSS。参考 `pets/linger` 的做法。

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

两个预览页，分工不同：

**1. `preview.html` — 手写交互预览台（改外形/动作时用这个）**

打开就能玩：切宠物、切 7 个状态、投喂/翻滚/摸摸头、追光、打瞌睡、自主巡游，全都在这一页。
宠物切换按钮在"Q 版圆润 / 官方轮廓版"旁边，还支持 URL 直开某只宠物：

```
preview.html?pet=cat      # 直接打开小猫（截图/分享用）
```

其中 **V1（Q 版）与 V2（官方轮廓版）是鲸鱼的手写设计稿**，同时也是
`scripts/extract-whale.mjs` 的抽取源——所以它们不能被改成生成物。**其余宠物**的
SVG、私有 CSS、切换按钮、台词池由脚本注入，改完宠物资源重跑一次即可：

```sh
pnpm sync:preview      # = node scripts/sync-preview-pets.mjs
```

注入的内容都夹在 `<!-- pet-xxx:begin/end -->` 标记里，手写部分不会被覆盖；
换宠物时预览页会自动换上该宠物的标题、提示语和台词（数据来自 `PetModule.text`）。

> ⚠️ 踩过的坑：注入的**数据脚本必须放在主 `<script>` 之前**，放到后面会被当成脚本正文、整页塌掉。
> 脚本里已经处理（`upsert(..., 'before')` 并且把 JSON 里的 `<` 转义成 `\u003c`）。
>
> 另一个历史坑：仓库里的 `preview.html` 一度比 `whale.ts` 旧（V2 少了 `.angry-eyes`），
> 于是 `pnpm extract` 会**悄悄删掉**闹脾气用的吊眉眼。已补回，现在
> `pnpm extract` 的产物与提交版一字不差——改 preview.html 的 V2 之后，请用
> `git diff src/client/whale.ts` 确认没有意外变化。

**2. `pet-preview.html` — 自动生成的检查台（一次看全）**

```sh
pnpm preview           # = node scripts/preview-pets.mjs
```

把 `BASE_CSS` + 每只宠物的 CSS/SVG 抽出来，铺成"宠物 × 状态"网格，用来一眼检查
所有状态有没有画坏、有没有串规则（它完全由 src 生成，不会与插件漂移）。

要截图留档（Windows 有 Chrome 时；`--user-data-dir` 要给一个**新建**目录，复用旧目录偶尔不产出 png）：

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu `
  --user-data-dir="$env:TEMP\chrome-pet-1" --hide-scrollbars --virtual-time-budget=4000 `
  --window-size=1200,900 --screenshot="pet-preview.png" "file:///$PWD/pet-preview.html"
```

`--virtual-time-budget` 调小（如 700）能看到"翻肚皮/跳跃"这类一次性动画的中间姿势；
默认截到的是动画 0% 相位。

- **单元/冒烟测试**：`pnpm test`（jsdom）。已覆盖默认宠物、菜单切换、样式表整段替换、
  容器状态类保留、`pet-whale:pet` 记忆、按宠物换台词、dispose 清理。
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

## 上游更新了怎么办

本仓库是本地改造版。上游有新提交时的合并流程、冲突对照表、体检命令（`pnpm pet:doctor`）
和回滚步骤写在 **[UPSTREAM-SYNC.md](UPSTREAM-SYNC.md)**。记住一条就够：合完先跑 `pnpm pet:doctor`，
它会告诉你样式切分有没有被破坏、预览页和 `whale.ts` 是否需要重新生成。
