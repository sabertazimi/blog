import * as gatsby from 'gatsby';
import useBuildTime from './useBuildTime';

const buildTime = new Date(2021, 0, 1, 8, 0, 0).toLocaleString('zh-CN');

describe('useBuildTime', () => {
  beforeAll(() => {
    jest.spyOn(gatsby, 'useStaticQuery').mockImplementation(() => {
      return {
        site: {
          buildTime,
        },
      };
    });
  });

  afterAll(() => {
    (gatsby.useStaticQuery as unknown as jest.SpyInstance).mockRestore();
  });

  test('should return date time', () => {
    const buildTime = useBuildTime();
    expect(buildTime).toBe('2021/1/1 上午8:00:00');
  });
});
