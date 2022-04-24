import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  const mockPosts = MockData.posts;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Header posts={mockPosts} />);

    expect(container).toMatchSnapshot();
  });
});
