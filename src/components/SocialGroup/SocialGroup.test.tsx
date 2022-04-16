import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import SocialGroup from './SocialGroup';

describe('SocialGroup', () => {
  const mockUrl = MockData.siteMetadata.siteUrl;

  test('should render correctly (snapshot)', () => {
    const tree = create(<SocialGroup url={mockUrl} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
