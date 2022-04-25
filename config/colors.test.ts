import { colors, getColorByName } from './colors';

describe('Colors', () => {
  const mockColors = [
    ['CS', colors.grape],
    ['CSS', colors.violet],
    ['Git', colors.violet],
    ['Gnu', colors.violet],
    ['Vim', colors.violet],
    ['HTML', colors.indigo],
    ['Linux', colors.blue],
    ['React', colors.blue],
    ['Redux', colors.blue],
    ['Security', colors.green],
    ['JavaScript', colors.yellow],
    ['Development', colors.orange],
    ['Architecture', colors.red],
    ['React Router', colors.red],
    ['Design Patterns', colors.violet],
    ['Web Development', colors.violet],
    ['Computer Science', colors.indigo],
    ['Frontend Development', colors.green],
  ];

  test.each(mockColors)(
    'should set color of tag [%s] to [%s]',
    (tag, color) => {
      expect(getColorByName(tag)).toBe(color);
    }
  );
});
