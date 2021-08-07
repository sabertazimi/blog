import { graphql, useStaticQuery } from 'gatsby';

const useBuildTime = (): string => {
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
