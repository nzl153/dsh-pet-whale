// 小猫宠物模块：手写 SVG + 独立样式表，是"再加一只宠物"的最小范例。
import type { PetModule } from '../types'
import { CAT_HTML } from './markup'
import { CAT_PET_CSS } from './styles'

export const catPet: PetModule = {
  id: 'cat',
  name: { zh: '小猫', en: 'Cat' },
  icon: '🐱',
  html: CAT_HTML,
  css: CAT_PET_CSS,
}
