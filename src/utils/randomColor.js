const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
];

const randomColor = () => {
  const colorIdx = Math.floor(Math.random() * (colors.length - 1));
  return colors[colorIdx];
};

export default randomColor;
