import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import PostCard from './PostCard';

describe('PostCard', () => {
  const mockBasePost = MockData.basePosts[0];
  const mockPost = MockData.posts[0];

  test('should render correctly (snapshot)', () => {
    const tree = create(<PostCard post={mockPost} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with partial data (snapshot)', () => {
    const tree = create(<PostCard post={mockBasePost} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<PostCard post={mockPost} />);

    const a11y = await axe(container, {
      rules: {
        'empty-heading': { enabled: false },
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });

  test('should render accessibility guidelines with partial data (AXE)', async () => {
    const { container } = render(<PostCard post={mockBasePost} />);

    const a11y = await axe(container, {
      rules: {
        'empty-heading': { enabled: false },
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });
});
