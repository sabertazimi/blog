import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import SocialGroup from './SocialGroup';

describe('SocialGroup', () => {
  const mockUrl = MockData.siteMetadata.siteUrl;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<SocialGroup url={mockUrl} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<SocialGroup url={mockUrl} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
