import MockData from '@mocks/data';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import TypingTitle from './TypingTitle';

describe('TypingTitle', () => {
  const mockTitles = MockData.siteMetadata.landingTitles;
  jest.mock('typed.js');

  test('should render correctly (snapshot)', () => {
    const { container } = render(<TypingTitle titles={mockTitles} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<TypingTitle titles={mockTitles} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should work correctly', async () => {
    render(<TypingTitle titles={mockTitles} />);

    await waitFor(() => {
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });
});
