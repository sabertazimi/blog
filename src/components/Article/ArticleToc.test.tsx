import React from 'react';
import { create, act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import ArticleToc from './ArticleToc';

describe('ArticleToc', () => {
  const toc = 'Post Table of Contents';

  test('should render correctly (snapshot)', () => {
    const renderer = create(<ArticleToc toc={toc} />);
    const tree = renderer.toJSON();
    expect(tree).toMatchSnapshot();

    const instance = renderer.root;
    const tocButton = instance.find((node) => node.type === 'button');
    act(() => tocButton.props.onClick());

    const expandTree = renderer.toJSON();
    expect(expandTree).toMatchSnapshot();
  });

  test('should expand ToC when clicked', () => {
    const { getByRole, getByText } = render(<ArticleToc toc={toc} />);
    const tocButton = getByRole('button');

    fireEvent.click(tocButton);
    expect(getByText(toc)).toBeInTheDocument();
  });
});
