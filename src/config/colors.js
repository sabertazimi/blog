const Colors = {
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
  gray: '#767676',
  white: '#fff',
  black: '#1b1c1d',
  light: '#f8f9fa',
  dark: '#343a40',
  github: '#181717',
  twitter: '#1da1f2',
  facebook: '#1877f2',
  linkedin: '#0a66c2',
  weibo: '#e6162d',
  overlay: 'rgba(0, 0, 0, 0.8)',
  transparent: 'rgba(0, 0, 0, 0)',
};

const getRandomColor = () => {
  const colors = Object.keys(Colors);
  const colorfulLimit = colors.findIndex(
    (color) => Colors[color] === Colors.gray
  );
  const colorIdx = Math.floor(Math.random() * colorfulLimit);
  return Colors[colors[colorIdx]];
};

export {
  Colors,
  getRandomColor,
};
