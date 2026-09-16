// 皮肤色板：身体渐变三档 + 腮红 + 眼睛，通过根元素 CSS 变量切换。
// 默认陶土主题（#BC6238 / #A3502C / #88431F / #D98E6A，暖墨眼 + 米白高光）。

export interface WhalePalette {
  id: string
  name: string
  /** 渐变亮端 */
  light: string
  /** 渐变主色 */
  main: string
  /** 渐变暗端 */
  dark: string
  /** 腮红 */
  blush: string
  /** 眼球颜色，默认暖墨 #2E2A24；深色皮肤需要反白 */
  eye?: string
  /** 眼内高光/瞳孔，默认米白 #FBF8F0；反白眼时换深色 */
  pupil?: string
}

export const PALETTES: readonly WhalePalette[] = [
  { id: 'terracotta', name: '陶土', light: '#BC6238', main: '#A3502C', dark: '#88431F', blush: '#D98E6A' },
  { id: 'ocean', name: '深海蓝', light: '#7FA8DC', main: '#4A7FBE', dark: '#2E5A8C', blush: '#E8A2B0' },
  { id: 'matcha', name: '抹茶绿', light: '#A8CC8F', main: '#6F9E5E', dark: '#43683A', blush: '#E8B08A' },
  { id: 'sakura', name: '樱粉', light: '#F2A7C0', main: '#E0779B', dark: '#B04E72', blush: '#F5B9CD' },
  { id: 'ink', name: '墨灰', light: '#B8B8B8', main: '#787878', dark: '#4C4C4C', blush: '#C89B9B' },
  { id: 'night', name: '夜黑', light: '#4A4A4A', main: '#262626', dark: '#121212', blush: '#7A5C5C', eye: '#F7F2E6', pupil: '#2E2A24' },
  { id: 'theme-blue', name: '主题蓝', light: '#8FB5FF', main: '#4D6BFE', dark: '#3550C9', blush: '#F0A0A0' },
  // 仙侠气质的青碧（灵儿那套）：青白裙 + 藕荷披帛 + 朱红点缀
  { id: 'qinglian', name: '青莲', light: '#B4DED4', main: '#5E9E93', dark: '#3D6F68', blush: '#E79AA6' },
]

export const DEFAULT_PALETTE = PALETTES.find((p) => p.id === 'theme-blue') ?? PALETTES[0]
export const DEFAULT_EYE = '#2E2A24'
export const DEFAULT_PUPIL = '#FBF8F0'

const PALETTE_KEY = 'pet-whale:palette'

export function loadPaletteId(): string {
  try {
    const raw = localStorage.getItem(PALETTE_KEY)
    if (raw !== null && PALETTES.some((p) => p.id === raw)) return raw
  } catch {
    // 忽略存储失败
  }
  return DEFAULT_PALETTE.id
}

export function savePaletteId(id: string): void {
  try {
    localStorage.setItem(PALETTE_KEY, id)
  } catch {
    // 忽略存储失败
  }
}

export function paletteOf(id: string): WhalePalette {
  return PALETTES.find((p) => p.id === id) ?? DEFAULT_PALETTE
}

/** 把色板写到根元素 CSS 变量上（SVG 里的 fill/stop-color 引这些变量）。 */
export function applyPalette(root: HTMLElement, palette: WhalePalette): void {
  root.style.setProperty('--pw-body-light', palette.light)
  root.style.setProperty('--pw-body', palette.main)
  root.style.setProperty('--pw-body-dark', palette.dark)
  root.style.setProperty('--pw-blush', palette.blush)
  root.style.setProperty('--pw-eye', palette.eye ?? DEFAULT_EYE)
  root.style.setProperty('--pw-pupil', palette.pupil ?? DEFAULT_PUPIL)
}
