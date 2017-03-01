// Need babel for this
// import path from 'path';
// import webpack from 'webpack';

var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        path.join(__dirname, '/2017/scripts/fitfab.js')
    ],
    output: {
        path: path.join(__dirname, '/2017/dist/'),
        filename: 'fitfab.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    publicPath: path.resolve(__dirname, './2017/dist')
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('fitfab.css')
    ]
}
