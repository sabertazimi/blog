import React from 'react';
import { create } from 'react-test-renderer';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(
      <ErrorBoundary>
        <div>App</div>
      </ErrorBoundary>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
