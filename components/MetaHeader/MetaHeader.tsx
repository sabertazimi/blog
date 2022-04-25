import { ErrorBoundary } from '@components';
import { siteConfig } from '@config';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import landingImage from '@images/landing.jpg';

interface Props {
  title?: string;
  description?: string;
  siteUrl?: string;
  themeColor?: string;
}

const MetaHeader = ({
  title = siteConfig.title,
  description = siteConfig.description,
  siteUrl = siteConfig.siteUrl,
  themeColor = siteConfig.themeColor,
}: Props): JSX.Element => (
  <ErrorBoundary>
    <>
      <Head key={title}>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content={themeColor} />
        <meta name="description" content={description} />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={`${siteUrl}/posts`}
        openGraph={{
          url: siteUrl,
          title,
          description,
          site_name: siteConfig.title,
          images: [
            {
              url: landingImage.src,
              width: landingImage.width,
              height: landingImage.height,
              alt: title,
              type: 'image/jpeg',
            },
          ],
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
    </>
  </ErrorBoundary>
);

export default MetaHeader;
