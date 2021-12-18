import { SocialList, SocialType } from '@config';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import SocialButton from './SocialButton';

const socialList = Object.keys(SocialList).concat('default');

describe('SocialButton', () => {
  test.each(socialList)(
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
      <SocialButton type="github" url="https://github.com" color="blue" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(socialList)(
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

  test.each(socialList)(
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
