/* eslint-disable jest/no-conditional-expect */
import * as gatsby from 'gatsby';
import usePostsMetadata from './usePostsMetadata';

const testCount = 5;
const testIterator = Array.from(Array(testCount).keys());
const BasePosts = testIterator.map(post => ({
  node: {
    fields: { slug: `/${post + 1}BasicNotes/` },
    frontmatter: { title: `${post + 1} Basic Notes` },
    timeToRead: post + 1,
  },
}));
const Posts = testIterator.map(post => ({
  node: {
    fields: { slug: `/${post + 1}BasicNotes/`, gitTime: `${post + 1} time` },
    frontmatter: {
      title: `${post + 1} Basic Notes`,
      subtitle: 'Be a Stupid Learner',
      author: 'Sabertaz',
      date: '2018-08-08T00:00:00.000Z',
      tags: ['JavaScript', 'Frontend Development', 'Web Development'],
    },
    timeToRead: post + 1,
  },
}));

describe('usePostsMetadata', () => {
  test.each(testIterator)(
    `should return correct [%i / ${testCount}] post metadata`,
    index => {
      const mockUseStaticQuery = jest
        .spyOn(gatsby, 'useStaticQuery')
        .mockImplementation(() => {
          return {
            allMarkdownRemark: {
              edges: Posts,
            },
          };
        });

      const { posts, tags } = usePostsMetadata();

      // Check correct metadata of post are returned
      expect(posts[index].slug).toBe(Posts[index].node.fields.slug);
      expect(posts[index].timeToRead).toBe(Posts[index].node.timeToRead);
      expect(posts[index].title).toBe(Posts[index].node.frontmatter.title);
      expect(posts[index].subtitle).toBe(
        Posts[index].node.frontmatter.subtitle
      );
      expect(posts[index].author).toBe(Posts[index].node.frontmatter.author);
      expect(posts[index].date).toBe(Posts[index].node.frontmatter.date);
      expect(posts[index].gitTime).toBe(Posts[index].node.fields.gitTime);

      // Check correct navigation data of post are returned
      if (index === 0) {
        expect(posts[index].nextPost).toBeFalsy();
      } else if (index === testCount - 1) {
        expect(posts[index].prevPost).toBeFalsy();
      } else {
        expect(posts[index].prevPost?.slug).toBe(
          Posts[index + 1].node.fields.slug
        );
        expect(posts[index].prevPost?.title).toBe(
          Posts[index + 1].node.frontmatter.title
        );
        expect(posts[index].nextPost?.slug).toBe(
          Posts[index - 1].node.fields.slug
        );
        expect(posts[index].nextPost?.title).toBe(
          Posts[index - 1].node.frontmatter.title
        );
      }

      // Check correct tags data of post are returned
      expect(tags.JavaScript).toBe(5);
      expect(tags['Frontend Development']).toBe(5);
      expect(tags['Web Development']).toBe(5);

      mockUseStaticQuery.mockRestore();
    }
  );

  test.each(testIterator)(
    `should return correct [%i / ${testCount}] post metadata with partial data`,
    index => {
      const mockUseStaticQuery = jest
        .spyOn(gatsby, 'useStaticQuery')
        .mockImplementation(() => {
          return {
            allMarkdownRemark: {
              edges: BasePosts,
            },
          };
        });

      const { posts, tags } = usePostsMetadata();

      // Check correct partial metadata of post are returned
      expect(posts[index].slug).toBe(BasePosts[index].node.fields.slug);
      expect(posts[index].timeToRead).toBe(BasePosts[index].node.timeToRead);
      expect(posts[index].title).toBe(BasePosts[index].node.frontmatter.title);

      // Check correct navigation data of post are returned
      if (index === 0) {
        expect(posts[index].nextPost).toBeFalsy();
      } else if (index === testCount - 1) {
        expect(posts[index].prevPost).toBeFalsy();
      } else {
        expect(posts[index].prevPost?.slug).toBe(
          BasePosts[index + 1].node.fields.slug
        );
        expect(posts[index].prevPost?.title).toBe(
          BasePosts[index + 1].node.frontmatter.title
        );
        expect(posts[index].nextPost?.slug).toBe(
          BasePosts[index - 1].node.fields.slug
        );
        expect(posts[index].nextPost?.title).toBe(
          BasePosts[index - 1].node.frontmatter.title
        );
      }

      // Check correct empty tags data of post are returned
      expect(tags).toMatchObject({});

      mockUseStaticQuery.mockRestore();
    }
  );
});
