var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var port = 3001;

module.exports = {
  name: 'client',
  target: 'web',
  module: {
    preLoaders: [
      { loader: 'source-map-loader', test: /\.js$/ }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: [
    'source-map'
  ],
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:' + port,
      'webpack/hot/dev-server',
      path.join(__dirname, '.tmp/es2015/src/index.js')
    ]
  },
  output: {
    filename: 'index.js'
  },
  devServer: {
    hot: true,
    port: port,
    contentBase: './public/'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ]
};
