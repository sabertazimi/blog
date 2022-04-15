import React from 'react';
import { create } from 'react-test-renderer';
import SocialGroup from './SocialGroup';

const url = 'https://example.com/posts/post';

describe('SocialGroup', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<SocialGroup url={url} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
