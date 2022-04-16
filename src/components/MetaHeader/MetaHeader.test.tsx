import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import MetaHeader from './MetaHeader';

describe('MetaHeader', () => {
  const mockUrl = MockData.siteMetadata.siteUrl;
  const mockTitle = MockData.siteMetadata.title;

  test('should render correctly (snapshot)', () => {
    const tree = create(
      <MetaHeader siteUrl={mockUrl} title={mockTitle} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
