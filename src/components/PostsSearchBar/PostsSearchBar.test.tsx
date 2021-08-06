import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PostsSearchBar from './PostsSearchBar';

const basePosts = Array.from(Array(5).keys()).map((post) => ({
  slug: `/${post}BasicNotes/`,
  timeToRead: post,
  title: `${post} Basic Notes`,
}));
const posts = basePosts.map((post, index) => ({
  ...post,
  subtitle: 'Be a Stupid Learner',
  author: 'Sabertaz',
  date: '2018-08-08T00:00:00.000Z',
  tags: ['JavaScript', 'Frontend Development', 'Web Development'],
  prevPost: {
    slug: `/${index}BasicNotes/`,
    title: `${index} Basic Notes`,
  },
  nextPost: {
    slug: `/${index} AdvancedNotes/`,
    title: `${index} Advanced Notes`,
  },
}));

describe('PostsSearchBar', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<PostsSearchBar posts={posts} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(Array.from(Array(5).keys()))(
    'should render [%i Basic Notes] options when searching',
    (index) => {
      const { getByRole, getByText } = render(<PostsSearchBar posts={posts} />);
      const input = getByRole('combobox');

      fireEvent.change(input, { target: { value: `${index}` } });
      waitFor(() => expect(getByText(posts[index].title)).toBeInTheDocument());
      fireEvent.change(input, { target: { value: '' } });
      waitFor(() => expect(getByText('0 Basic Notes')).not.toBeInTheDocument());
    }
  );
});
