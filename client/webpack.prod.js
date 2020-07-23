/* eslint-disable */
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const API_URL = 'http://jmssalesapp-env.g8pvrm2vaf.us-east-1.elasticbeanstalk.com';
const API_URL = 'https://www.weldereducationandtraining.com';
// const OPEN_HOUSE_API_URL = 'https://04vz3a2u7h.execute-api.us-east-1.amazonaws.com/production/email/open-house';

module.exports = merge(common, {
  entry: './src/index.js',
  output: {
    filename: 'bundle.prod.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      exclude: [
        'img', 'sitemap.xml',
        'scrollsnap-polyfill.bundled.js'
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Online Welding Courses - Anywhere, Anytime | Welder Education & Training',
      filename: 'index.html',
      template: 'template.html'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
      'API_URL': JSON.stringify(API_URL),
    })
  ]
});
