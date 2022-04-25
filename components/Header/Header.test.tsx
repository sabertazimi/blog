import mockData from '@mocks/data';
import { act, render, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  const mockPosts = mockData.posts;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Header posts={mockPosts} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    waitFor(() => expect(container).toMatchSnapshot());
  });
});
