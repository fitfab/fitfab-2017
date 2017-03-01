// Need babel for this
// import path from 'path';
// import webpack from 'webpack';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
    devtool: 'source-map',
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        // extract css file
        new ExtractTextPlugin('fitfab.css'),
        // Uglify JS
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          output: {
            comments: false
          },
          sourceMap: true
        }),
        // Env plugin
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
        })
    ],
    resolve: {
        extentions: [ '', '.js' ]
    }
}
