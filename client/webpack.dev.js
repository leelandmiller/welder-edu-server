/* eslint max-len: 0 */
'use strict';
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const API_URL = 'http://localhost:8080';
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.dev.js',
    path: path.resolve(__dirname, 'dev'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './dev',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev'),
      API_URL: JSON.stringify(API_URL)
    }),
  ]
});
