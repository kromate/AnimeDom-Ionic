const SWPrecache = require('sw-precache-webpack-plugin')

module.exports = {
    // ...other vue-cli plugin options...
  //   configureWebpack: config => {
  //     if (import.meta.env.NODE_ENV === 'production') {
  //         config.plugins.push(
  //             new SWPrecache({
  //                 cacheId: 'nhb-year-in-pixels',
  //                 filepath: 'dist/service-worker.js',
  //                 staticFileGlobs: [
  //                     'dist/*',
  //                     'dist/**/*',
  //                 ],
  //                 stripPrefix: 'dist/',
  //                 maximumFileSizeToCacheInBytes: 3097152,
  //             })
  //         )
  //     }
  // },
    pwa: {
      name: 'Animedom',
      themeColor: '#000',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      assetsVersion:'2',
      manifestPath:'public/manifest.json',

      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: './public/sw.js',
        exclude: ['_redirects'],
        // swDest: 'service-worker.js',
        // ...other Workbox options...
      }
    },

    chainWebpack: (config) => {

      // A, remove the plugin
      config.plugins.delete('prefetch')
    }
  }

