const path = require('path');
const webpack = require('webpack');

const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function webpackStuff(env) {
  return {
    devtool: 'source-map',

    entry: [
      './src/index.js',
      './styles/app.css',
    ],

    output: {
      filename: 'app.[chunkhash].js',
      path: path.resolve(__dirname, './public'),
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
          path.resolve(__dirname, './'),
        ],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      }],
    },

    plugins: [
      new ExtractTextPlugin({
        filename: './app.[contenthash].css',
        allChunks: true,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BabiliPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          discardDuplicates: { removeAll: true },
          discardComments: { removeAll: true },
        },
      }),
      new CopyWebpackPlugin([{
        from: 'src/static',
      }]),
    ],
  };
};
