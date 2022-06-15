import { getSandpackCssText } from '@codesandbox/sandpack-react';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => (
  <Html>
    <Head>
      <style
        id="sandpack"
        dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
