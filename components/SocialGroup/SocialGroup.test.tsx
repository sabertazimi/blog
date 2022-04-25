import mockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import SocialGroup from './SocialGroup';

describe('SocialGroup', () => {
  const mockUrl = mockData.siteConfig.siteUrl;

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
