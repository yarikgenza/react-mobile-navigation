const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-mobile-navigation-action-sheet': path.join(__dirname, '..', '..', 'src'),
    },
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(ttf|woff|eot|otf|svg|jpe?g|png|gif?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
    ],
  },
};
