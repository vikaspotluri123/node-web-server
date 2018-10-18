const config = require('../config.js');
const defaults = require('./defaults').config;

module.exports = Object.assign({}, defaults, config);
