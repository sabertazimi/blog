import { render, screen } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import FlexContainer from './FlexContainer';

describe('FlexContainer', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render children correctly', () => {
    render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>
    );

    const container = screen.getByRole('main');
    const header = screen.getByText('FlexContainer');

    expect(container).toContainElement(header);
  });
});
