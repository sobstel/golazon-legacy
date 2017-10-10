const path = require('path');
const webpack = require('webpack');

const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function webpackStuff(env) {
  const plugins = [
    new ExtractTextPlugin({
      filename: 'app.[contenthash].css',
      allChunks: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ];

  if (env === 'development') {
    plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }));
  }

  if (env === 'production') {
    plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }));
    plugins.push(new BabiliPlugin());
    plugins.push(new OptimizeCSSPlugin({
      cssProcessorOptions: {
        discardDuplicates: { removeAll: true },
        discardComments: { removeAll: true },
      },
    }));
    plugins.push(new CopyWebpackPlugin([{
      from: 'src/static',
    }]));
  }

  return {
    devtool: 'source-map',

    entry: [
      './src/index.js',
      './styles/app.scss',
    ],

    output: {
      filename: 'app.[chunkhash].js',
      path: path.resolve(__dirname, './public'),
      publicPath: '/',
    },

    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
          plugins: [],
        },
        include: [
          path.resolve(__dirname, 'src'),
        ],
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules/'],
            },
          }],
        }),
      }],
    },

    plugins,
  };
};
