import { ErrorBoundary } from '@components';
import { siteConfig } from '@config';
import { Helmet } from 'react-helmet';

const MetaHeader = (): JSX.Element => {
  const { title, siteUrl } = siteConfig;

  return (
    <ErrorBoundary>
      <Helmet
        key={siteUrl}
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1890ff" />
        <meta name="description" content={title} />
        <title>{title}</title>
        <link rel="canonical" href={siteUrl} />
      </Helmet>
    </ErrorBoundary>
  );
};

export default MetaHeader;
