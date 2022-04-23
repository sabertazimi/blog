import { ColorPalette, getColorByName } from './colors';

describe('Colors', () => {
  const mockColors = [
    ['CS', ColorPalette.grape],
    ['CSS', ColorPalette.violet],
    ['Git', ColorPalette.violet],
    ['Gnu', ColorPalette.violet],
    ['Vim', ColorPalette.violet],
    ['HTML', ColorPalette.indigo],
    ['Linux', ColorPalette.blue],
    ['React', ColorPalette.blue],
    ['Redux', ColorPalette.blue],
    ['Security', ColorPalette.green],
    ['JavaScript', ColorPalette.yellow],
    ['Development', ColorPalette.orange],
    ['Architecture', ColorPalette.red],
    ['React Router', ColorPalette.red],
    ['Design Patterns', ColorPalette.violet],
    ['Web Development', ColorPalette.violet],
    ['Computer Science', ColorPalette.indigo],
    ['Frontend Development', ColorPalette.green],
  ];

  test.each(mockColors)(
    'should set color of tag [%s] to [%s]',
    (tag, color) => {
      expect(getColorByName(tag)).toBe(color);
    }
  );
});
