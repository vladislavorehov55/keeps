const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.css$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                exportLocalsConvention: 'camelCase'
                            },

                        }
                    }
                ]
            },
            {
                test: /\.jpg$/,
                use: [{loader: "file-loader"}]
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"})
    ]

};