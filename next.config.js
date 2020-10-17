const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");

const config = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
}

module.exports = withPlugins([
  [withCSS, {
    //cssModules: true, // JSX Styles not working when CSS Modules is enabled
    cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  }],
  withSass,
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true
    },
  }],
], config)