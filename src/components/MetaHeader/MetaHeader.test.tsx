import React from 'react';
import { create } from 'react-test-renderer';
import MetaHeader from './MetaHeader';

const siteUrl = 'https://example.com';
const title = 'Website Title';

describe('MetaHeader', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(
      <MetaHeader siteUrl={siteUrl} title={title} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
