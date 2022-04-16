import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
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
    const tree = create(<Header posts={mockPosts} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
