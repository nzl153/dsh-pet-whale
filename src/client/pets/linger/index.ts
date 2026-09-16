// 灵儿（Q 版 3 头身仙侠少女）宠物模块。
// 竖版盒子：默认容器是 137×101（横的），人物站着会被压扁，所以这里声明 104×140，
// 插件会把它写进 --pw-pet-w/--pw-pet-h，贴边挤扁、巡游范围、地面阴影都跟着走。
import type { PetModule } from '../types'
import { LINGER_HTML } from './markup'
import { LINGER_PET_CSS } from './styles'
import { LINGER_TEXT } from './text'

export const lingerPet: PetModule = {
  id: 'linger',
  name: { zh: '灵儿', en: "Ling'er" },
  icon: '🌸',
  html: LINGER_HTML,
  css: LINGER_PET_CSS,
  text: LINGER_TEXT,
  size: { w: 87, h: 160 },
}
