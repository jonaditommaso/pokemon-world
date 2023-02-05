import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar/Navbar'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Head>
      <title>Pokemon World</title>
    </Head>
    <Navbar />
    <Component {...pageProps} />
  </Provider>
}
