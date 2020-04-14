
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [ "@babel/preset-react","@babel/preset-env"],
                plugins: [
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-syntax-dynamic-import",
                    "@babel/plugin-syntax-import-meta",
                    ["@babel/plugin-proposal-class-properties", { "loose": false }],
                    "@babel/plugin-proposal-json-strings"

                ]
            }
        }]
    },
}