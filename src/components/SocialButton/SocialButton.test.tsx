import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import SocialButton from './SocialButton';
import { SocialType, SocialList } from '@config';

const socialList = Object.keys(SocialList).concat('default');

describe('SocialButton', () => {
  test.each(socialList)('render %s correctly (snapshot)', (social) => {
    const tree = renderer
      .create(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test.each(socialList)('render %s with correct structure', (social) => {
    const { getByRole } = render(
      <SocialButton type={social as SocialType} url={`https://${social}.com`} />
    );
    const link = getByRole('link');
    const icon = getByRole('img');

    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(link).toContainElement(icon);
  });

  test.each(socialList)('render %s with correct URL', (social) => {
    const { getByRole } = render(
      <SocialButton type={social as SocialType} url={`https://${social}.com`} />
    );
    const link = getByRole('link');

    expect(link).toHaveAttribute('href', `https://${social}.com`);
  });
});
