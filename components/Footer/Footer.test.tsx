import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
  const mockTime = MockData.time;
  const mockAuthor = MockData.siteConfig.author;
  const mockSocialList = MockData.siteConfig.socialList;

  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <Footer
        buildTime={mockTime}
        author={mockAuthor}
        socialList={mockSocialList}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <Footer
        buildTime={mockTime}
        author={mockAuthor}
        socialList={mockSocialList}
      />
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
