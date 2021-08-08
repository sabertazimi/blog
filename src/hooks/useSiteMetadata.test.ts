import { SocialList, SocialType } from '@config';
import * as gatsby from 'gatsby';
import useSiteMetadata from './useSiteMetadata';

const siteMetadata = {
  title: 'Title',
  author: 'Sabertaz',
  siteUrl: 'https://example.com',
  email: 'example@github.com',
  disqusUrl: 'https://example.com',
  landingTitles: ['A', 'B', 'C'],
  socialList: {
    github: 'author',
    twitter: 'author',
    facebook: 'author',
    linkedin: 'author',
    weibo: 'author',
  },
  bookList: Array.from(Array(3).keys()).map(() => ({
    title: 'Title',
    author: 'Sabertaz',
    url: 'https://example.com',
    description: 'Description',
  })),
};

describe('useSiteMetadata', () => {
  test(`should return correct site metadata`, () => {
    jest.spyOn(gatsby, 'useStaticQuery').mockImplementation(() => {
      return {
        site: {
          siteMetadata,
        },
      };
    });

    const {
      title,
      author,
      siteUrl,
      email,
      disqusUrl,
      landingTitles,
      socialList,
      bookList,
    } = useSiteMetadata();

    expect(title).toBe(siteMetadata['title']);
    expect(author).toBe(siteMetadata['author']);
    expect(siteUrl).toBe(siteMetadata['siteUrl']);
    expect(email).toBe(siteMetadata['email']);
    expect(disqusUrl).toBe(siteMetadata['disqusUrl']);
    landingTitles.forEach((title, index) =>
      expect(title).toBe(siteMetadata['landingTitles'][index])
    );
    Object.keys(SocialList).forEach((social) =>
      expect(socialList[social as SocialType]).toBe(
        siteMetadata['socialList'][social as SocialType]
      )
    );
    bookList.forEach((book, index) => {
      expect(book['title']).toBe(siteMetadata['bookList'][index]['title']);
      expect(book['author']).toBe(siteMetadata['bookList'][index]['author']);
      expect(book['url']).toBe(siteMetadata['bookList'][index]['url']);
      expect(book['description']).toBe(
        siteMetadata['bookList'][index]['description']
      );
    });

    (gatsby.useStaticQuery as unknown as jest.SpyInstance).mockRestore();
  });
});
