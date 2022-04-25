import { getPostsMeta, getSitemap } from '@lib';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const postsMeta = await getPostsMeta();
  const sitemap = getSitemap(postsMeta);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

const SiteMap = () => {};

export default SiteMap;
