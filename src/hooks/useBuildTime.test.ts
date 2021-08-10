import * as gatsby from 'gatsby';
import useBuildTime from './useBuildTime';

const buildTime = new Date(2021, 0, 1, 8, 0, 0).toLocaleString('zh-CN');

describe('useBuildTime', () => {
  let mockUseStaticQuery: jest.SpyInstance;

  beforeEach(() => {
    mockUseStaticQuery = jest
      .spyOn(gatsby, 'useStaticQuery')
      .mockImplementation(() => {
        return {
          site: {
            buildTime,
          },
        };
      });
  });

  afterEach(() => {
    mockUseStaticQuery.mockRestore();
  });

  test('should return date time', () => {
    const buildTime = useBuildTime();
    expect(buildTime).toBe('2021/1/1 上午8:00:00');
  });
});
