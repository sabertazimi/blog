import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
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

  return site.siteMetadata;
};

export default useSiteMetadata;
