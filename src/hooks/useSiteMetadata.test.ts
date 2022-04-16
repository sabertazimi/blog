import type { SocialType } from '@config';
import { SocialList } from '@config';
import MockData from '@mocks/data';
import * as gatsby from 'gatsby';
import useSiteMetadata from './useSiteMetadata';

describe('useSiteMetadata', () => {
  const mockSiteMetadata = MockData.siteMetadata;

  test(`should return correct site metadata`, () => {
    jest.spyOn(gatsby, 'useStaticQuery').mockImplementation(() => {
      return {
        site: {
          siteMetadata: mockSiteMetadata,
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

    expect(title).toBe(mockSiteMetadata.title);
    expect(author).toBe(mockSiteMetadata.author);
    expect(siteUrl).toBe(mockSiteMetadata.siteUrl);
    expect(email).toBe(mockSiteMetadata.email);
    expect(disqusUrl).toBe(mockSiteMetadata.disqusUrl);

    landingTitles.forEach((title, index) =>
      expect(title).toBe(mockSiteMetadata.landingTitles[index])
    );

    Object.keys(SocialList).forEach(social =>
      expect(socialList[social as SocialType]).toBe(
        mockSiteMetadata.socialList[social as SocialType]
      )
    );

    bookList.forEach((book, index) => {
      expect(book.title).toBe(mockSiteMetadata.bookList[index].title);
      expect(book.author).toBe(mockSiteMetadata.bookList[index].author);
      expect(book.url).toBe(mockSiteMetadata.bookList[index].url);
      expect(book.description).toBe(
        mockSiteMetadata.bookList[index].description
      );
    });
  });
});
