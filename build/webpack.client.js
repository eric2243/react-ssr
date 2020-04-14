const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const clientConfig = {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, '../src/client/dist')
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: "[path][name]-[local]-[hash:base64:5]",
                    sourceMap: true,
                }
            }, {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                }
            }]
        }]
    },
}
module.exports = merge(baseConfig, clientConfig);