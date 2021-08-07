import { render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import Container from './Container';

describe('Container', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(
      <Container role="main">
        <h1>Container</h1>
      </Container>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render children correctly', () => {
    const { getByRole } = render(
      <Container role="main">
        <h1>Container</h1>
      </Container>
    );
    const container = getByRole('main');

    expect(container.firstChild).toHaveTextContent('Container');
  });
});
