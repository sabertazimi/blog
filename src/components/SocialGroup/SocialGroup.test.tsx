import MockData from '@MockData';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import SocialGroup from './SocialGroup';

describe('SocialGroup', () => {
  const mockUrl = MockData.siteMetadata.siteUrl;

  test('should render correctly (snapshot)', () => {
    const tree = create(<SocialGroup url={mockUrl} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<SocialGroup url={mockUrl} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
