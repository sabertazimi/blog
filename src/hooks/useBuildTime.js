import { useStaticQuery, graphql } from 'gatsby';

const useBuildTime = () => {
  const { site } = useStaticQuery(
    graphql`
      query BuildTimeQuery {
        site {
          buildTime
        }
      }
    `
  );

  return site.buildTime;
};

export default useBuildTime;
