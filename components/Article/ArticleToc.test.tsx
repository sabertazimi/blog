import MockData from '@mocks/data';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import ArticleToc from './ArticleToc';

describe('ArticleToc', () => {
  const mockToc = MockData.posts[0].toc;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleToc toc={mockToc} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<ArticleToc toc={mockToc} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should expand ToC when clicked', () => {
    render(<ArticleToc toc={mockToc} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(mockToc)).toBeInTheDocument();
  });
});
