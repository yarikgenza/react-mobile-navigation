const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-mobile-navigation-core': path.join(__dirname, '..', '..', '..', 'packages', 'react-mobile-navigation-core', 'src'),
      'react-mobile-navigation-engine': path.join(__dirname, '..', '..', '..', 'packages', 'react-mobile-navigation-engine', 'src'),
    },
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};
