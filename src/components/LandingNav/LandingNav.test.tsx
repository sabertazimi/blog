import { Routes } from '@config';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act, create } from 'react-test-renderer';
import LandingNav from './LandingNav';

describe('LandingNav', () => {
  test('should render routes correctly (snapshot)', () => {
    const renderer = create(<LandingNav routes={Routes} />);
    const tree = renderer.toJSON();
    expect(tree).toMatchSnapshot();

    const instance = renderer.root;
    const navButton = instance.find(
      (node) => node.type === 'div' && node.props.role === 'button'
    );
    act(() => navButton.props.onClick());

    const expandTree = renderer.toJSON();
    expect(expandTree).toMatchSnapshot();
  });

  test('should render route with correct structure', () => {
    const { getByRole, getAllByRole } = render(<LandingNav routes={Routes} />);
    const nav = getByRole('navigation');
    const navLinks = getAllByRole('link');
    const navButton = getByRole('button');
    const icon = getByRole('img');

    expect(nav).toBeInTheDocument();
    navLinks.forEach((navLink) => expect(navLink).toBeInTheDocument());
    expect(navButton).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    navLinks.forEach((navLink) => expect(nav).toContainElement(navLink));
    expect(navButton).toContainElement(icon);
  });

  test('should expanded when clicked', () => {
    const { getByRole } = render(<LandingNav routes={Routes} />);
    const nav = getByRole('navigation');
    const overlay = getByRole('banner');
    const navButton = getByRole('button');

    fireEvent.click(navButton);
    expect(nav).toHaveClass('translate-x-0');
    expect(overlay).toHaveClass('bg-opacity-80');
  });
});
