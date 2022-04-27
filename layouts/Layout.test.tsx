import mockData from '@mocks/data';
import { render, waitFor } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  const mockTime = mockData.time;
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <Layout banner="layout" buildTime={mockTime} posts={mockPosts}>
        <div>Layout</div>
      </Layout>
    );

    waitFor(() => expect(container).toMatchSnapshot());
  });
});
