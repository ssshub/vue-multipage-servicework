'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
//const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

// 解决报错：vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
const { VueLoaderPlugin } = require('vue-loader');
const entry = utils.getEntries('./src/pages/**/*.js') // 获得入口js文件
const first_md = utils.getEntrie('./src/common/js/first_md.js') // 获得入口js文件
Object.assign(entry, first_md)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

//console.log(utils.assetsPath('img/[name].[hash:7].[ext]'))

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common'),
      'router': resolve('src/router'),
      'views': resolve('src/views'),
      'cpnts': resolve('src/components'),
      'base': resolve('src/base'),
      'assets': resolve('src/assets'),
      'static': resolve('static'),
      'api': resolve('src/api')
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(art|html)$/,
        loader: "art-template-loader",
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules/_element-ui@2.4.10@element-ui/packages'), resolve('node_modules/element-ui/packages')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: {
    "bridge": "bridge",
  },
  plugins: [
    // 添加VueLoaderPlugin，以响应vue-loader
    new VueLoaderPlugin(),
    // new TransformModulesPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助 ServiceWorkers 快速启用
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   swDest: 'service-worker.js',
    //   importWorkboxFrom: 'local',
    //   importsDirectory: 'static',
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   ignoreUrlParametersMatching: [/./],
    //   //globPatterns: ['dist/*.{js,png,jpg,svg,html,css}'],
    //   runtimeCaching: [{
    //     // To match cross-origin requests, use a RegExp that matches
    //     // the start of the origin:
    //     urlPattern: /\/api/,
    //     handler: 'cacheFirst',
    //     options: {
    //       cacheableResponse: {
    //         statuses: [0, 200]
    //       }
    //     }
    //   },
    //   //   {
    //   //   urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/g,
    //   //   handler: 'cacheFirst',
    //   //   options: {
    //   //     cacheName: 'runtime-images',
    //   //     cacheableResponse: {
    //   //       statuses: [0, 200]
    //   //     },
    //   //     expiration: {
    //   //       maxEntries: 1000,
    //   //       maxAgeSeconds: 3 * 30 * 24 * 60 * 60, // 90 Days
    //   //     }
    //   //   }
    //   // }
    //     {
    //       urlPattern: new RegExp('^http://zmz\.maoyu\.tv'),
    //       handler: 'cacheFirst',
    //       options: {
    //         cacheName: 'runtime-images',
    //         cacheableResponse: {
    //           statuses: [0, 200]
    //         },
    //         expiration: {
    //           maxEntries: 1000,
    //           maxAgeSeconds: 3 * 30 * 24 * 60 * 60, // 90 Days
    //         }
    //       }
    //     }
    //   ]
    // }),
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}


