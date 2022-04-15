import React from 'react';
import { create } from 'react-test-renderer';
import TagsCloud from './TagsCloud';

const activeTag = 'JavaScript';
const tags = {
  Redux: 1,
  React: 5,
  JavaScript: 10,
  'Frontend Development': 20,
  'Web Development': 30,
};

describe('TagsCloud', () => {
  test('should render correctly with active tag (snapshot)', () => {
    const tree = create(
      <TagsCloud activeTag={activeTag} tags={tags} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly without active tag (snapshot)', () => {
    const tree = create(<TagsCloud activeTag="" tags={tags} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
