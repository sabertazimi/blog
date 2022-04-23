import type { SocialType } from '@config';
import MockData from '@mocks/data';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import SocialButton from './SocialButton';

describe('SocialButton', () => {
  const mockSocialList = [
    ...Object.keys(MockData.siteMetadata.socialList),
    'default',
  ];

  test.each(mockSocialList)(
    'should render [%s] button correctly (snapshot)',
    social => {
      const tree = create(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    }
  );

  test('should render colorful button correctly (snapshot)', () => {
    const tree = create(
      <SocialButton type="github" url="https://github.com" color="#299954" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test.each(mockSocialList)(
    'should render [%s] button accessibility guidelines (AXE)',
    async social => {
      const { container } = render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      );

      const a11y = await axe(container);

      expect(a11y).toHaveNoViolations();
    }
  );

  test('should render colorful button accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <SocialButton type="github" url="https://github.com" color="#299954" />
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test.each(mockSocialList)(
    'should render [%s] button with correct structure',
    social => {
      render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      );

      const link = screen.getByRole('link');
      const icon = screen.getByRole('img');

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(link).toContainElement(icon);
    }
  );

  test.each(mockSocialList)(
    'should render [%s] button with correct URL',
    social => {
      render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      );

      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('href', `https://${social}.com`);
    }
  );
});
