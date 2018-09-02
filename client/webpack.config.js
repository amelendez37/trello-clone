const webpack = require('webpack');
const { resolve } = require('path');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  return {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index'],
    devtool: 'cheap-eval-source-map', // shows pre-bundled code when viewing an error
    output: {
      path: resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          enforce: 'pre', // run before babel
          test: /\.jsx?$/,
          use: ['eslint-loader'],
          exclude: '/node-modules/',
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(env.API_URL),
      },
    })],
  };
};