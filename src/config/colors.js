const Colors = {
  gray: '#767676',
  github: '#181717',
  twitter: '#1da1f2',
  facebook: '#1877f2',
  linkedin: '#0a66c2',
  weibo: '#e6162d',
};

const ColorPalette = {
  red: '#f03e3e',
  pink: '#d7336c',
  grape: '#ae3ec9',
  violet: '#7048e8',
  indigo: '#4263eb',
  blue: '#1c7ed6',
  cyan: '#1098ad',
  teal: '#0ca678',
  green: '#37b24d',
  lime: '#74b816',
  yellow: '#f59f00',
  orange: '#f76707',
};

const hashString = (name = '') => {
  return name.length;
};

const getColorByName = (name = '') => {
  const palette = Object.keys(ColorPalette);
  const colorIdx = hashString(name) % palette.length;
  return ColorPalette[palette[colorIdx]];
};

export { Colors, getColorByName };
