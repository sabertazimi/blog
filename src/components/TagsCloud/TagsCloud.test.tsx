import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import TagsCloud from './TagsCloud';

describe('TagsCloud', () => {
  const mockTag = 'JavaScript';
  const mockTags = {
    Redux: 1,
    React: 5,
    JavaScript: 10,
    'Frontend Development': 20,
    'Web Development': 30,
  };

  test('should render correctly with active tag (snapshot)', () => {
    const tree = create(
      <TagsCloud activeTag={mockTag} tags={mockTags} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly without active tag (snapshot)', () => {
    const tree = create(<TagsCloud activeTag="" tags={mockTags} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <TagsCloud activeTag={mockTag} tags={mockTags} />
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
