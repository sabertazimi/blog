import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import FlexContainer from './FlexContainer';

describe('FlexContainer', () => {
  test('should render correctly (snapshot)', () => {
    const tree = renderer
      .create(
        <FlexContainer role="main">
          <h1>FlexContainer</h1>
        </FlexContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render children correctly', () => {
    const { getByRole } = render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>
    );
    const container = getByRole('main');

    expect(container.firstChild).toHaveTextContent('FlexContainer');
  });
});
