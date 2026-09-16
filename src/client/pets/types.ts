// 宠物模块接口：加一只新宠物 = 新建 pets/<id>/ 目录，导出一个 PetModule，
// 然后在 pets/index.ts 的 PETS 里加一行 import + 一行数组项。
//
// 运行时契约（详见 docs/MULTI-PET.md）：
// 1) html 是一段内联 SVG，塞进已有的 <div class="pet-official"> 里；容器的状态 class
//    （idle/think/working/celebrate/error/wait/disappointed + joy/dizzy/… 、根上的
//    sleeping/dragging/edge-*/swimming）由插件逻辑负责切换，宠物只要用 CSS 响应它们。
// 2) css 是该宠物独占的样式表，只有它处于选中状态时才会挂上；因此表内选择器不需要
//    再加宠物前缀，但 @keyframes 必须用自己的前缀（鲸鱼是 pw-，它已在 BASE_CSS 里）。
// 3) 上色只走 CSS 变量 --pw-body / --pw-body-light / --pw-body-dark / --pw-blush /
//    --pw-eye / --pw-pupil，这样 palettes.ts 的色板对所有宠物自动生效。
import type { PetTextOverrides } from '../i18n'

export interface PetModule {
  /** 稳定 id：i18n 文案键、localStorage（pet-whale:pet）、菜单去重都用它 */
  id: string
  /** 兜底名字：i18n 的 pet[id] 缺失时按当前语言取这里 */
  name: { zh: string; en: string }
  /** 右键菜单里的图标 */
  icon: string
  /** 内联 SVG 字符串 */
  html: string
  /** 宠物独占样式：部件外观 + 各状态动画 + 自己的 keyframes */
  css: string
  /**
   * 可选：这只宠物专属的文案覆盖。
   * i18n.ts 的基准文案是鲸鱼口吻（"正在深潜检索知识库""游一游"）——换了宠物就该换说法，
   * 猫不会深潜。只写要改的条目，台词池（string[]）必须整组替换。见 pets/cat/text.ts。
   */
  text?: { zh?: PetTextOverrides; en?: PetTextOverrides }
  /**
   * 可选：容器尺寸（未缩放的 CSS px），默认 137×101（鲸鱼的盒子）。
   * viewBox 长宽比与默认盒差异较大时用它校正，避免留白影响贴边/水花位置。
   */
  size?: { w: number; h: number }
  /** 可选：鼠标追光的瞳孔选择器，默认 '.pupil-highlight' */
  pupilSelector?: string
}
