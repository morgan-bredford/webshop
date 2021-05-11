const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('build'),
    filename: 'server.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      }
    ]
  }
};