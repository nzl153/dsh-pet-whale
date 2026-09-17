// 灵儿（4.3 头身仙侠少女）宠物模块。
// 同人作品：角色原型为《仙剑奇侠传》赵灵儿（软星 / 大宇资讯 IP），非商业用途、可应权利人要求移除，
// 详见仓库根目录 NOTICE.md。
// 竖版盒子：默认容器是 137×101（横的），人物站着会被压扁，所以这里声明 87×160，
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
  // 她是站着的：idle 的"随机小挪动"会变成无缘无故到处飘（而且没有对应的飞行/走动动作），
  // 所以关掉。想看她在屏幕上飞，用右键菜单的「御剑」（= 游泳模式）。
  idleDrift: false,
  // idle 时能演的原地动作（关闭御剑后她就靠这些"活着"）；约定见 pets/types.ts
  // 只留 4 个：转圈 / 放法术 / 扇扇子 / 远眺（前三个看得出来，远眺安静）
  micro: ['spin', 'spell', 'fan', 'gaze'],
}
