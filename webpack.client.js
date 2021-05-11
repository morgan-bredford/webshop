const path = require('path')
//const nE = require('webpack-node-externals')

module.exports = {
    entry: './client/index.js',
    target: 'web',
    //externals: nE(),
    output: {
        path: path.resolve('public'),
        filename: 'client.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [(/node_modules/)],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
}