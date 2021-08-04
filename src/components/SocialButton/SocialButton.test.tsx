import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import SocialButton from './SocialButton';

describe('SocialButton', () => {
  test('render GitHub correctly (snapshot)', () => {
    const tree = renderer
      .create(<SocialButton type="github" url="https://github.com/" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render GitHub with correct structure', () => {
    const { getByRole } = render(
      <SocialButton type="github" url="https://github.com/" />
    );
    const link = getByRole('link');
    const icon = getByRole('img');

    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(link).toContainElement(icon);
  });

  test('render GitHub with correct structure', () => {
    const { getByRole } = render(
      <SocialButton type="github" url="https://github.com/" />
    );
    const link = getByRole('link');

    expect(link).toHaveAttribute('href', 'https://github.com/');
  });
});
