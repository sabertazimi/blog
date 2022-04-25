import { siteConfig } from '@config';
import 'antd/dist/antd.css';
import NextProgress from 'next-progress';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/tailwind.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <NextProgress height={3} color={siteConfig.themeColor} />
    <Component className="min-h-screen" {...pageProps} />
  </>
);

export default App;
