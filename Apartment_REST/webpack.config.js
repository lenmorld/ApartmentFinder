var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        quiet: false,
        inline: true,
        contentBase: './src',
        port: 3005,
        proxy: {
            '/api/**': {
                target: 'http://localhost:9402',
                ignorePath: true,
                changeOrigin: true,
                secure: false
            },
        },
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};



/*
    "webpack": "^1.13.1",
    "webpack-dev-middleware": "^1.6.1",
    "webpack-dev-server": "^1.14.1",
    "webpack-hot-middleware": "^2.11.0"
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3005,
        proxy: {
            '/api/**': {
                target: 'http://localhost:9402',
                secure: false,
                changeOrigin: true
            },
        },
        historyApiFallback: false,
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
        path: 'src',
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

 */