const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: [
        'babel-polyfill',
        './client/index.js',
    ],
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js',
    },
    plugins: [],
    devServer: {
        historyApiFallback: true,
        contentBase: './client',
        proxy: {
            '/graphql': {
                target: 'http://api:3000', // `api` is the node service defined in docker-compose.yml
                secure: false,
            },
        },
    },
});