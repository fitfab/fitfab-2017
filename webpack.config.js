/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';

const commonConfig = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, '/2017/scripts/fitfab.js')
    ],
    output: {
        path: path.join(__dirname, '/2017/dist'),
        filename: 'fitfab.js',
        publicPath: '/2017/dist'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            },
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
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }]
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
    // webpack-dev-server setup
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        clientLogLevel: 'none',
        port: 9000,
        watchContentBase: true
    }
};

module.exports = function start(env) {

    console.log('ENV: ', env);
    return commonConfig;

};
