const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-mobile-navigation-action-sheet': path.join(__dirname, '..', '..', '..', 'packages', 'react-mobile-navigation-action-sheet', 'src'),
      'react-mobile-navigation-core': path.join(__dirname, '..', '..', '..', 'packages', 'react-mobile-navigation-core', 'src'),
      'react-mobile-navigation-engine': path.join(__dirname, '..', '..', '..', 'packages', 'react-mobile-navigation-engine', 'src'),
      'react-mobile-navigation-sheet': path.join(__dirname, '..', '..', '..', 'packages', 'react-mobile-navigation-sheet', 'src'),
    },
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};
