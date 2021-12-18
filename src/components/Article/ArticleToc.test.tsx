import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act, create } from 'react-test-renderer';
import ArticleToc from './ArticleToc';

const toc = 'Post Table of Contents';

describe('ArticleToc', () => {
  test('should render correctly (snapshot)', () => {
    const renderer = create(<ArticleToc toc={toc} />);
    const tree = renderer.toJSON();
    expect(tree).toMatchSnapshot();

    const instance = renderer.root;
    const tocButton = instance.find(node => node.type === 'button');
    act(() => tocButton.props.onClick());

    const expandTree = renderer.toJSON();
    expect(expandTree).toMatchSnapshot();
  });

  test('should expand ToC when clicked', () => {
    render(<ArticleToc toc={toc} />);
    const tocButton = screen.getByRole('button');

    fireEvent.click(tocButton);
    expect(screen.getByText(toc)).toBeInTheDocument();
  });
});
