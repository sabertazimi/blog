import MockData from '@MockData';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import ArticleToc from './ArticleToc';

describe('ArticleToc', () => {
  const mockToc = MockData.posts[0].toc;

  test('should render correctly (snapshot)', () => {
    const tree = create(<ArticleToc toc={mockToc} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should expand ToC when clicked', () => {
    render(<ArticleToc toc={mockToc} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(mockToc)).toBeInTheDocument();
  });
});
