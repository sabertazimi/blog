import { Routes } from '@config';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import LandingNav from './LandingNav';

describe('LandingNav', () => {
  test('should render routes correctly (snapshot)', () => {
    const tree = create(<LandingNav routes={Routes} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<LandingNav routes={Routes} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should render route with correct structure', () => {
    render(<LandingNav routes={Routes} />);

    const nav = screen.getByRole('navigation');
    const icon = screen.getByRole('img');

    expect(nav).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    const navButton = screen.getByRole('button');

    expect(navButton).toBeInTheDocument();
    expect(navButton).toContainElement(icon);

    const navLinks = screen.getAllByRole('link');

    navLinks.forEach(navLink => expect(navLink).toBeInTheDocument());
    navLinks.forEach(navLink => expect(nav).toContainElement(navLink));
  });

  test('should expanded when clicked', () => {
    render(<LandingNav routes={Routes} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('navigation')).toHaveClass('translate-x-0');
    expect(screen.getByRole('banner')).toHaveClass('bg-opacity-80');
  });
});
