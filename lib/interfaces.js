const {networkInterfaces} = require('os');

const interfacesInfo = networkInterfaces();

const interfaces = Object.keys(interfacesInfo).reduce((known, networkInterface) =>
	known.concat(interfacesInfo[networkInterface].map(({address}) => address))
, []);

module.exports = interfaces;
