import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { Routes } from '@config';
import LandingNav from './LandingNav';

describe('LandingNav', () => {
  test('should render routes correctly (snapshot)', () => {
    const component = renderer.create(<LandingNav routes={Routes} />);
    let tree = component.toJSON() as renderer.ReactTestRendererJSON[];

    expect(tree).toMatchSnapshot();
    renderer.act(() => tree[1].props.onClick());
    tree = component.toJSON() as renderer.ReactTestRendererJSON[];
    expect(tree).toMatchSnapshot();
  });

  test('should render route with correct structure', () => {
    const { getByRole, getAllByRole } = render(<LandingNav routes={Routes} />);
    const nav = getByRole('navigation');
    const links = getAllByRole('link');
    const button = getByRole('button');
    const icon = getByRole('img');

    expect(nav).toBeInTheDocument();
    links.forEach((link) => expect(link).toBeInTheDocument());
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    links.forEach((link) => expect(nav).toContainElement(link));
    expect(button).toContainElement(icon);
  });

  test('should expanded when clicked', () => {
    const { getByRole } = render(<LandingNav routes={Routes} />);
    const nav = getByRole('navigation');
    const overlay = getByRole('banner');
    const button = getByRole('button');

    fireEvent.click(button);
    expect(nav).toHaveClass('translate-x-0');
    expect(overlay).toHaveClass('bg-opacity-80');
  });
});
