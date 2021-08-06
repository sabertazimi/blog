import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SocialType, SocialList } from '@config';
import SocialButton from './SocialButton';

const socialList = Object.keys(SocialList).concat('default');

describe('SocialButton', () => {
  test.each(socialList)(
    'should render [%s] button correctly (snapshot)',
    (social) => {
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
    (social) => {
      const { getByRole } = render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      );
      const link = getByRole('link');
      const icon = getByRole('img');

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(link).toContainElement(icon);
    }
  );

  test.each(socialList)(
    'should render [%s] button with correct URL',
    (social) => {
      const { getByRole } = render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      );
      const link = getByRole('link');

      expect(link).toHaveAttribute('href', `https://${social}.com`);
    }
  );
});
