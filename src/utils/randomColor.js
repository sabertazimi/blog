const randomColor = () => {
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

  const colorIdx = Math.floor(Math.random() * 11);
  return colors[colorIdx];
};

export default randomColor;
