import MockData from '@mocks/data';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import PostsSearchBar from './PostsSearchBar';

describe('PostsSearchBar', () => {
  const mockPosts = MockData.posts;

  beforeEach(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = element => getComputedStyle(element);
  });

  test('should render correctly (snapshot)', () => {
    const { container } = render(<PostsSearchBar posts={mockPosts} />);

    expect(container).toMatchSnapshot();
  });

  test.each(mockPosts)(
    'should render [%# Basic Notes] options when searching',
    async ({ index, title }) => {
      jest.spyOn(console, 'error').mockImplementation(jest.fn());
      render(<PostsSearchBar posts={mockPosts} />);
      const input = screen.getByRole('combobox');

      fireEvent.change(input, { target: { value: `${index + 1}` } });

      expect(await screen.findAllByText(title)).toHaveLength(2);

      fireEvent.change(input, { target: { value: '' } });

      expect(await screen.findAllByText(title)).toHaveLength(2);
    }
  );
});
