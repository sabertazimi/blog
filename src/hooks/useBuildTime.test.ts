import * as gatsby from 'gatsby';
import useBuildTime from './useBuildTime';

const mockTime = new Date(2022, 0, 1, 8, 0, 0).toLocaleString('zh-CN', {
  hour12: false,
});

describe('useBuildTime', () => {
  let mockUseStaticQuery: jest.SpyInstance;

  beforeEach(() => {
    mockUseStaticQuery = jest
      .spyOn(gatsby, 'useStaticQuery')
      .mockImplementation(() => {
        return {
          site: {
            buildTime: mockTime,
          },
        };
      });
  });

  afterEach(() => {
    mockUseStaticQuery.mockRestore();
  });

  test('should return date time', () => {
    const buildTime = useBuildTime();

    expect(buildTime).toBe('2022/1/1 08:00:00');
  });
});
