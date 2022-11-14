/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const getHostConfig = require('./getHostConfig');
const getShared = require('./getShared');

const ENV_KEY_DEVELOPMENT = 'development';
const ENV_KEY_PRODUCTION = 'production';

const ENV = process.env.NODE_ENV || ENV_KEY_DEVELOPMENT;
const IS_DEV = ENV === ENV_KEY_DEVELOPMENT;
const IS_PROD = ENV === ENV_KEY_PRODUCTION;
const IS_LINT = process.env.LINT === 'true';
const SOURCE_MAP = process.env.REACT_APP_SOURCE_MAP || 'source-map';

module.exports = function createWebpackConfig(props) {
  const {
    appName, pkg, exposes, cwd, overrides = {}, envVars = {}, hasClient = true,
  } = props;
  const deps = pkg.dependencies;

  const HOST_CONFIG = getHostConfig(appName);
  const PUBLIC_DIR = path.resolve(cwd, 'public');
  const OUTPUT_DIR = path.resolve(cwd, 'build');

  if (!IS_LINT) {
    console.warn('\nApps:');
    console.warn(HOST_CONFIG.apps);
    console.warn('\n');
  }

  const federationConfig = {
    name: appName,
    filename: 'remoteEntry.js',
    remotes: HOST_CONFIG.remotes,
    exposes,
    shared: getShared(pkg),
  };

  const config = {
    name: appName,
    mode: ENV,
    target: ['web'],

    output: {
      filename: `${appName}.[name].[contenthash].js`,
      chunkFilename: `${appName}.[name].[contenthash].js`,
      publicPath: HOST_CONFIG[appName].publicPath,
      path: OUTPUT_DIR,
      assetModuleFilename: 'assets/[name].[contenthash][ext]',
    },

    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.svg'],
    },

    devtool: SOURCE_MAP,

    devServer: {
      historyApiFallback: true,
      port: HOST_CONFIG[appName].port,
      host: HOST_CONFIG[appName].internalHost,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: false,
      liveReload: true,
    },

    performance: {
      hints: IS_DEV ? false : 'warning',
    },

    plugins: [
      IS_DEV && new webpack.SourceMapDevToolPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
          REACT_APP_GA: JSON.stringify(process.env.REACT_APP_GA),
          REACT_APP_API: JSON.stringify(process.env.REACT_APP_API),
          REACT_APP_GRAPHQL_URI: JSON.stringify(process.env.REACT_APP_GRAPHQL_URI),
          REACT_APP_USERNAME: JSON.stringify(process.env.REACT_APP_USERNAME),
          REACT_APP_PASSWORD: JSON.stringify(process.env.REACT_APP_PASSWORD),
          TRACING_URLS: JSON.stringify(HOST_CONFIG.tracingUrls),
          ...envVars,
        },
      }),
      new ModuleFederationPlugin(federationConfig),
      hasClient && new HtmlWebPackPlugin({
        filename: path.resolve(OUTPUT_DIR, 'index.html'),
        template: path.resolve(PUBLIC_DIR, 'index.html'),
        cache: false,
        minify: IS_PROD ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(PUBLIC_DIR, 'assets'),
            to: path.resolve(OUTPUT_DIR, 'assets'),
            noErrorOnMissing: true,
          },
          {
            from: path.resolve(PUBLIC_DIR, 'browserconfig.xml'),
            to: path.resolve(OUTPUT_DIR),
            noErrorOnMissing: true,
          },
          {
            from: path.resolve(PUBLIC_DIR, 'manifest.json'),
            to: path.resolve(OUTPUT_DIR),
            noErrorOnMissing: true,
          },
        ],
      }),
      IS_PROD && new CompressionWebpackPlugin({
        filename: '[path][base].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.svg$|\.css$|\.gif$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      IS_PROD && new CompressionWebpackPlugin({
        filename: '[path][base].br[query]',
        algorithm: 'brotliCompress',
        test: /\.js$|\.svg$|\.css$|\.gif$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new RetryChunkLoadPlugin({ maxRetries: 5 }),
    ].filter(Boolean),

    module: {
      strictExportPresence: true,

      rules: [
        {
          test: /\.(svg|ttf|eot|woff|woff2|gif|jpg|jpeg|bmp|png)$/,
          type: 'asset/resource',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: IS_DEV },
            },
            IS_PROD && {
              loader: 'esbuild-loader',
              options: {
                loader: 'css',
                minify: true,
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: new RegExp(`node_modules\\b(?!\\${path.sep}@link)\\b.*`),
          use: [
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'tsx',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: IS_PROD,
      minimizer: [
        new ESBuildMinifyPlugin({
          css: true,
          legalComments: 'none',
        }),
      ],
    },
  };

  return merge(config, overrides);
};
