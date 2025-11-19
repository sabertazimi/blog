const socialColors = {
  gray: '#767676',
  github: '#181717',
  x: '#000000',
  facebook: '#0866ff',
  weibo: '#e6162d',
}

const colorPalette = {
  red: '#f03e3e',
  pink: '#d7336c',
  grape: '#ae3ec9',
  violet: '#7048e8',
  indigo: '#4263eb',
  blue: '#1677ff',
  cyan: '#1098ad',
  teal: '#0ca678',
  green: '#37b24d',
  lime: '#74b816',
  yellow: '#f59f00',
  orange: '#f76707',
}

const themeColors = {
  black: '#171717',
}

const colors = {
  ...socialColors,
  ...colorPalette,
  ...themeColors,
}

type SocialColor = keyof typeof socialColors
type PaletteColor = keyof typeof colorPalette

function hashString(name: string) {
  return name.length
}

function getColorByName(name: string): string {
  const palette = Object.keys(colorPalette)
  const colorIdx = hashString(name) % palette.length
  // eslint-disable-next-line security/detect-object-injection -- colorIdx is safe.
  const paletteColor = palette[colorIdx] as PaletteColor
  // eslint-disable-next-line security/detect-object-injection -- paletteColor is safe.
  return colorPalette[paletteColor]
}

export { colors, getColorByName, socialColors }
export type { SocialColor }
