import { siteConfig } from '@config';
import NextProgress from 'next-progress';
import type { AppProps } from 'next/app';

// Keep stylesheets importing order
import '../styles/tailwind.css';
import 'antd/dist/antd.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <NextProgress height={3} color={siteConfig.themeColor} />
    <Component className="min-h-screen" {...pageProps} />
  </>
);

export default App;
