import { ColorPalette } from '@config';
import NextProgress from 'next-progress';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import '../styles/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextProgress height={3} color={ColorPalette['blue']} />
      <Component className="min-h-screen" {...pageProps} />
    </>
  );
}

export default App;
