import '../styles/globals.css';
import 'antd/dist/antd.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className="min-h-screen" {...pageProps} />;
}

export default MyApp;
