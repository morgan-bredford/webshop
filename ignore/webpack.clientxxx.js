const path = require('path');
//const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './client/index.js',

  target: 'web',

  //externals: [nodeExternals()],

  output: {
    path: path.resolve('public'),
    filename: 'client.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            ignore: [/(node_module)/],
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  }
};