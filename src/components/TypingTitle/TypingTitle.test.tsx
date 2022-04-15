import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import TypingTitle from './TypingTitle';

jest.mock('typed.js');

const landingTitles = [`I'm a coder.`, `I'm a learner.`];

describe('TypingTitle', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<TypingTitle titles={landingTitles} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should work correctly', async () => {
    render(<TypingTitle titles={landingTitles} />);

    await waitFor(() => {
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });
});
