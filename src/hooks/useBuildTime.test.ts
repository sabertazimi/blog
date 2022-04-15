import MockData from '@MockData';
import * as gatsby from 'gatsby';
import useBuildTime from './useBuildTime';

describe('useBuildTime', () => {
  const mockTime = MockData.time;

  test('should return date time', () => {
    jest.spyOn(gatsby, 'useStaticQuery').mockImplementation(() => {
      return {
        site: {
          buildTime: mockTime,
        },
      };
    });

    const buildTime = useBuildTime();

    expect(buildTime).toBe(mockTime);
  });
});
