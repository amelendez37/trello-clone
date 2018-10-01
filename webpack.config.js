const webpack = require('webpack');
const dotenv = require('dotenv');
const { resolve } = require('path');

module.exports = () => {
  const env = dotenv.config().parsed;

  return {
    mode: 'production',
    entry: ['@babel/polyfill', './client/src/index'],
    output: {
      path: resolve(__dirname, './client/public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          enforce: 'pre', // run before babel
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['eslint-loader'],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: ['react-svg-loader'],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(env && env.NODE_ENV === 'production' ? env.API_URL_PROD : env.API_URL_DEV),
      },
    })],
  };
};
