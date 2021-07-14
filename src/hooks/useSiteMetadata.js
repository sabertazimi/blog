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
            socialList {
              github
              twitter
              facebook
              linkedin
              weibo
            }
            email
            disqusUrl
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
