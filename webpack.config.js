const prod = require('./webpack.production.js');
const dev = require('./webpack.development.js')();

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
