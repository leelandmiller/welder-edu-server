'use strict';
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const API_URL = 'http://jmssalesapp-env.g8pvrm2vaf.us-east-1.elasticbeanstalk.com';
const API_URL = 'https://api.jmssalesinc.com';
// const API_URL = 'http://localhost:3001';
// eslint-disable-next-line
// if (process.env.NODE_ENV === 'production') {
//   API_URL = 'https://jmssalesinc.com';
// } else {
//   API_URL = 'http://localhost:3001';
// }

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './dist',
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(API_URL)
    }),
    new UglifyJsPlugin()
  ]
};
