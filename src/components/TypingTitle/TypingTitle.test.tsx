import MockData from '@MockData';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import TypingTitle from './TypingTitle';

describe('TypingTitle', () => {
  const mockTitles = MockData.siteMetadata.landingTitles;
  jest.mock('typed.js');

  test('should render correctly (snapshot)', () => {
    const tree = create(<TypingTitle titles={mockTitles} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should work correctly', async () => {
    render(<TypingTitle titles={mockTitles} />);

    await waitFor(() => {
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });
});
