import { ErrorBoundary } from '@components';
import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  siteUrl: string;
  title: string;
}

const MetaHeader = ({ siteUrl, title }: Props): JSX.Element => (
  <ErrorBoundary>
    <Helmet key={siteUrl}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={title} />
      <title>{title}</title>
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  </ErrorBoundary>
);

export default MetaHeader;
