/* eslint-disable jest/no-conditional-expect */
import MockData from '@MockData';
import * as gatsby from 'gatsby';
import usePostsMetadata from './usePostsMetadata';

describe('usePostsMetadata', () => {
  const mockPosts = MockData.posts;
  const mockBasePosts = MockData.basePosts;

  test.each(mockPosts)(
    `should return correct [%# / ${mockPosts.length}] post metadata`,
    ({
      index,
      fields: { slug, gitTime },
      frontmatter: { title, subtitle, author, date },
      timeToRead,
    }) => {
      jest.spyOn(gatsby, 'useStaticQuery').mockImplementation(() => {
        return {
          allMarkdownRemark: {
            edges: mockPosts.map(post => ({ node: post })),
          },
        };
      });

      const { posts, tags } = usePostsMetadata();

      // Check correct tags data of post are returned
      expect(tags.JavaScript).toBe(5);
      expect(tags['Frontend Development']).toBe(5);
      expect(tags['Web Development']).toBe(5);

      // Check correct metadata of post are returned
      expect(posts[index].slug).toBe(slug);
      expect(posts[index].timeToRead).toBe(timeToRead);
      expect(posts[index].title).toBe(title);
      expect(posts[index].subtitle).toBe(subtitle);
      expect(posts[index].author).toBe(author);
      expect(posts[index].date).toBe(date);
      expect(posts[index].gitTime).toBe(gitTime);

      // Check correct navigation data of post are returned
      if (index === 0) {
        expect(posts[index].nextPost).toBeFalsy();
      } else if (index === mockPosts.length - 1) {
        expect(posts[index].prevPost).toBeFalsy();
      } else {
        expect(posts[index].prevPost?.slug).toBe(
          mockPosts[index + 1].fields.slug
        );
        expect(posts[index].prevPost?.title).toBe(
          mockPosts[index + 1].frontmatter.title
        );
        expect(posts[index].nextPost?.slug).toBe(
          mockPosts[index - 1].fields.slug
        );
        expect(posts[index].nextPost?.title).toBe(
          mockPosts[index - 1].frontmatter.title
        );
      }
    }
  );

  test.each(mockBasePosts)(
    `should return correct [%# / ${mockBasePosts.length}] post metadata with partial data`,
    ({ index, fields: { slug }, frontmatter: { title }, timeToRead }) => {
      jest.spyOn(gatsby, 'useStaticQuery').mockImplementation(() => {
        return {
          allMarkdownRemark: {
            edges: mockBasePosts.map(post => ({ node: post })),
          },
        };
      });

      const { posts, tags } = usePostsMetadata();

      // Check correct empty tags data of post are returned
      expect(tags).toMatchObject({});

      // Check correct partial metadata of post are returned
      expect(posts[index].slug).toBe(slug);
      expect(posts[index].timeToRead).toBe(timeToRead);
      expect(posts[index].title).toBe(title);

      // Check correct navigation data of post are returned
      if (index === 0) {
        expect(posts[index].nextPost).toBeFalsy();
      } else if (index === mockBasePosts.length - 1) {
        expect(posts[index].prevPost).toBeFalsy();
      } else {
        expect(posts[index].prevPost?.slug).toBe(
          mockBasePosts[index + 1].fields.slug
        );
        expect(posts[index].prevPost?.title).toBe(
          mockBasePosts[index + 1].frontmatter.title
        );
        expect(posts[index].nextPost?.slug).toBe(
          mockBasePosts[index - 1].fields.slug
        );
        expect(posts[index].nextPost?.title).toBe(
          mockBasePosts[index - 1].frontmatter.title
        );
      }
    }
  );
});
