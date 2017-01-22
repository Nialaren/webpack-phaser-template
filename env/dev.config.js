'use strict';

const path = require('path');
const webpack = require('webpack');


// Phaser webpack config
let phaserModule = path.join(__dirname, '../node_modules/phaser/'),
    phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        app: path.join(__dirname, '../app/main.js'),
        vendor: [
            'lodash',
            'jquery',
            'p2',
            'pixi',
            'phaser'
        ]
    },
    output: {
        pathinfo: true,
        path: path.join(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    // Bigger file but faster compiling
    // devtool: 'eval-cheap-module-source-map',
    devtool: 'source-map',
    devServer: {
        // hot: true,
        inline: true,
        port: 3001,
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]

            },
            {
                test: /\.js$/,
                exclude: [/(node_modules)/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['stage-2']
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEVELOPMENT: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
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
