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

const languageColors = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Vue: '#4fc08d',
  HTML: '#e34f26',
  C: '#555555',
  Rust: '#dea584',
  Shell: '#4eaa25',
  JSON: '#292929',
  Markdown: '#083fa1',
  TeX: '#008080',
}

const themeColors = {
  black: '#171717',
  gray: '#767676',
}

const colors = {
  ...colorPalette,
  ...languageColors,
  ...themeColors,
}

type PaletteColor = keyof typeof colorPalette

function hashString(name: string) {
  return name.length
}

function getColorByName(name: string): string {
  const palette = Object.keys(colorPalette)
  const colorIdx = hashString(name) % palette.length

  const paletteColor = palette[colorIdx] as PaletteColor

  return colorPalette[paletteColor]
}

export { colors, getColorByName }
