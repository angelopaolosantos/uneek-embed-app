/** Import Global CSS */

import "../styles/rsuite-custom.less";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../styles/carousel.scss";
import "../styles/antd-custom.scss"
import "../styles/global.scss";

import ApolloProvider from "../contexts/apollo/ApolloProvider";
import Head from "next/head"

// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"></meta>
      <script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
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

export default MyApp;
