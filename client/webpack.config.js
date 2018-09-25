const webpack = require('webpack');
const { resolve } = require('path');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  return {
    mode: 'production',
    entry: ['@babel/polyfill', './src/index'],
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
        {
          test: /\.svg$/,
          use: ['react-svg-loader'],
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
