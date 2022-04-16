import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import Article from './Article';

describe('Article', () => {
  const mockUrl = MockData.siteMetadata.siteUrl;
  const mockBasePost = MockData.basePosts[0];
  const mockPost = MockData.posts[0];

  test('should render correctly (snapshot)', () => {
    const tree = create(
      <Article post={mockPost} commentUrl={mockUrl} socialUrl={mockUrl} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with partial data (snapshot)', () => {
    const tree = create(
      <Article post={mockBasePost} commentUrl={mockUrl} socialUrl={mockUrl} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <Article post={mockPost} commentUrl={mockUrl} socialUrl={mockUrl} />
    );

    const a11y = await axe(container, {
      rules: {
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });

  test('should render accessibility guidelines (AXE) with partial data', async () => {
    const { container } = render(
      <Article post={mockBasePost} commentUrl={mockUrl} socialUrl={mockUrl} />
    );

    const a11y = await axe(container, {
      rules: {
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });
});
