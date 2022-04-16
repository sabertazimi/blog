import MockData from '@MockData';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import Footer from './Footer';

describe('Footer', () => {
  const mockTime = MockData.time;
  const mockAuthor = MockData.siteMetadata.author;
  const mockSocialList = MockData.siteMetadata.socialList;

  test('should render correctly (snapshot)', () => {
    const tree = create(
      <Footer
        buildTime={mockTime}
        author={mockAuthor}
        socialList={mockSocialList}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
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
