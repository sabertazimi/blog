import ErrorBoundary from '@components/ErrorBoundary'
import { siteConfig } from '@config'
import landingImage from '@images/landing.jpg'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

interface Props {
  title?: string
  description?: string
  siteUrl?: string
  themeColor?: string
}

function MetaHeader({
  title = siteConfig.title,
  description = siteConfig.description,
  siteUrl = siteConfig.siteUrl,
  themeColor = siteConfig.themeColor,
}: Props): JSX.Element {
  return (
    <ErrorBoundary>
      <>
        <Head key={title}>
          <title>{title}</title>
          <meta charSet="UTF-8" />
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
            handle: `@${siteConfig.socials.twitter}`,
            site: `@${siteConfig.socials.twitter}`,
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={[
            { name: 'theme-color', content: themeColor },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
            {
              httpEquiv: 'x-ua-compatible',
              content: 'IE=edge; chrome=1',
            },
            {
              name: 'application-name',
              content: siteConfig.title,
            },
            {
              property: 'dc:creator',
              content: siteConfig.author,
            },
          ]}
          additionalLinkTags={[
            {
              rel: 'manifest',
              href: '/manifest.json',
            },
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
            {
              rel: 'apple-touch-icon',
              href: '/images/logo-full.png',
              sizes: '200x200',
            },
          ]}
        />
      </>
    </ErrorBoundary>
  )
}

export default MetaHeader
