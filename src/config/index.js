const PRIMARY_COLOR = 'blue';

const BreakPoints = {
  mobile: 767,
  laptop: 960,
  desktop: 1280,
};

const Colors = {
  primary: '#1890ff',
  red: '#f03e3e',
  pink: '#d7336c',
  grape: '#ae3ec9',
  violet: '#7048e8',
  indigo: '#4263eb',
  blue: '#1c7ed6',
  cyn: '#1098ad',
  teal: '#0ca678',
  green: '#37b24d',
  lime: '#74b816',
  yellow: '#f59f00',
  orange: '#f76707',
  white: '#fff',
  black: '#1b1c1d',
  light: '#f8f9fa',
  dark: '#343a40',
  grey: '#767676',
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
    (color) => Colors[color] === Colors.white
  );
  const colorIdx = Math.floor(Math.random() * colorfulLimit);
  return Colors[colors[colorIdx]];
};

const SocialType = {
  website: 'website',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  linkedin: 'linkedin',
  weibo: 'weibo',
};

const SocialQuery = {
  twitter: 'https://twitter.com/intent/tweet?url=',
  facebook: 'https://www.facebook.com/sharer.php?u=',
  linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
  weibo: 'https://service.weibo.com/share/share.php?url=',
};

export {
  PRIMARY_COLOR,
  BreakPoints,
  Colors,
  getRandomColor,
  SocialType,
  SocialQuery,
};
