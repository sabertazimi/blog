import React from 'react';
import renderer from 'react-test-renderer';

import SocialButton from './SocialButton';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SocialButton type="github" url="https://github.com/" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
