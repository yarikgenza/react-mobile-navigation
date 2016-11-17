const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'react-mobile-navigation-engine': path.join(__dirname, '..', '..', 'src'),
    },
  },
  module: {
    loaders: [
      { test: /\.(js)(\?.*)?$/, loader: 'babel-loader' },
    ],
  },
};
