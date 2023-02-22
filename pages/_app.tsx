import '../styles/globals.css'
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import { Provider } from 'react-redux';

import Navbar from '../components/navbar/Navbar'
import { ThemeConfig } from '../config/theme.config';
import { store } from '../redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Head>
      <title>Pokemon World</title>
    </Head>
    <ThemeConfig>
      <Navbar />
    </ThemeConfig>
    <ThemeConfig>
      <Component {...pageProps} />
    </ThemeConfig>
  </Provider>
}
