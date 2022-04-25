import mockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Article from './Article';

describe('Article', () => {
  const mockBasePost = mockData.basePosts[0];
  const mockPost = mockData.posts[0];

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Article post={mockPost} />);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly with partial data (snapshot)', () => {
    const { container } = render(<Article post={mockBasePost} />);

    expect(container).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<Article post={mockPost} />);

    const a11y = await axe(container, {
      rules: {
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });

  test('should render accessibility guidelines (AXE) with partial data', async () => {
    const { container } = render(<Article post={mockBasePost} />);

    const a11y = await axe(container, {
      rules: {
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });
});
