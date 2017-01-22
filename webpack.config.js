/**
 * Created by fisa on 4/14/16.
 */
'use strict';

let path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log('env:', process.env.NODE_ENV);

let config = null;

switch (process.env.NODE_ENV){
    case 'dev':{
        config = require(path.join(__dirname, './env/dev.config.js'));
    } break;
    case 'production':{
        config = require(path.join(__dirname, './env/production.config.js'));
    } break;
    default: {
        config = require(path.join(__dirname, './env/dev.config.js'));
    } break;
}

module.exports = config;
