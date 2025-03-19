import type { AppProps } from 'next/app';
import MainLayout from '../components/MainLayout';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

