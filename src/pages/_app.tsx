// import default style
import '../styles/custom-theme.less'
import '../styles/carousel.scss'
import 'pure-react-carousel/dist/react-carousel.es.css'

import ApolloProvider from '../contexts/apollo/ApolloProvider'
import { Auth0Provider } from '@auth0/auth0-react'
// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      redirectUri="http://localhost:3000/"
    >
      <ApolloProvider>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"></meta>
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </Auth0Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp