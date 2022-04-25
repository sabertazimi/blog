import { colorPalette, getColorByName } from './colors';

describe('Colors', () => {
  const mockColors = [
    ['CS', colorPalette.grape],
    ['CSS', colorPalette.violet],
    ['Git', colorPalette.violet],
    ['Gnu', colorPalette.violet],
    ['Vim', colorPalette.violet],
    ['HTML', colorPalette.indigo],
    ['Linux', colorPalette.blue],
    ['React', colorPalette.blue],
    ['Redux', colorPalette.blue],
    ['Security', colorPalette.green],
    ['JavaScript', colorPalette.yellow],
    ['Development', colorPalette.orange],
    ['Architecture', colorPalette.red],
    ['React Router', colorPalette.red],
    ['Design Patterns', colorPalette.violet],
    ['Web Development', colorPalette.violet],
    ['Computer Science', colorPalette.indigo],
    ['Frontend Development', colorPalette.green],
  ];

  test.each(mockColors)(
    'should set color of tag [%s] to [%s]',
    (tag, color) => {
      expect(getColorByName(tag)).toBe(color);
    }
  );
});
