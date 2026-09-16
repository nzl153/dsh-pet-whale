// 小猫宠物模块：手写 SVG + 独立样式表 + 专属文案，是"再加一只宠物"的最小范例。
import type { PetModule } from '../types'
import { CAT_HTML } from './markup'
import { CAT_PET_CSS } from './styles'
import { CAT_TEXT } from './text'

export const catPet: PetModule = {
  id: 'cat',
  name: { zh: '小猫', en: 'Cat' },
  icon: '🐱',
  html: CAT_HTML,
  css: CAT_PET_CSS,
  // 基准文案是鲸鱼口吻（在深潜、在游动），猫说这些很违和，所以整组覆盖
  text: CAT_TEXT,
}
