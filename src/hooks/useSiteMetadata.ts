import type { SiteMetadata } from '@types';
import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(
    graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            title
            author
            siteUrl
            email
            disqusUrl
            landingTitles
            socialList {
              github
              twitter
              facebook
              linkedin
              weibo
            }
            bookList {
              title
              author
              url
              description
            }
          }
        }
      }
    `
  );

  return data.site.siteMetadata;
};

export default useSiteMetadata;
