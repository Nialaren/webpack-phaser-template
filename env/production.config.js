'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// Phaser webpack config
let phaserModule = path.join(__dirname, '../node_modules/phaser/'),
    phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        app: path.join(__dirname, '../app/main.js')
    },
    output: {
        pathinfo: true,
        publicPath: '/dist/',
        path: path.join(__dirname, '../dist'),
        filename: '[name].bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/(node_modules)/, /pixi\.js/, /phaser-split\.js/, /p2\.js/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { modules: false }],
                            'stage-2'
                        ],
                        plugins: [
                            ['transform-runtime', { polyfill: true }]
                        ]
                    }
                }]
            },
            {
                test: /pixi\.js/,
                use: [{
                    loader: 'expose-loader?PIXI',
                    options: 'PIXI'
                }]
            },
            {
                test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader?Phaser',
                    options: 'Phaser'
                }]
            },
            {
                test: /p2\.js/,
                use: [{
                    loader: 'expose-loader?p2',
                    options: 'p2'
                }]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true
                            }
                        },
                        // config of postcss can be found in js root directory
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            // React libraries
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            DEVELOPMENT: false
        }),
        new ExtractTextPlugin('[name].styles.min.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false
        })
    ],
    resolve:{
        mainFields: ['browser', 'module', 'main'],
        modules: ['node_modules'],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};