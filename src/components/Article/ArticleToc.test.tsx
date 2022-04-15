import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import ArticleToc from './ArticleToc';

const toc = 'Post Table of Contents';

describe('ArticleToc', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<ArticleToc toc={toc} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should expand ToC when clicked', () => {
    render(<ArticleToc toc={toc} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(toc)).toBeInTheDocument();
  });
});
