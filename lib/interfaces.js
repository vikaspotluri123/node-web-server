const {networkInterfaces} = require('os');

const interfacesInfo = networkInterfaces();

// eslint-disable-next-line unicorn/no-reduce
const interfaces = Object.keys(interfacesInfo).reduce((known, networkInterface) =>
	known.concat(interfacesInfo[networkInterface].map(({address}) => address))
, []);

module.exports = interfaces;
