if (!module.parent) {
	console.log('This is an internal utility.');
	process.exit(1);
}

const {Service} = require('node-windows');
const {join} = require('path');

const service = new Service({
	name: 'Node Web Server',
	description: 'Minimal web server with functional firewall',
	script: join(__dirname, '..', '/index.js'),
});

module.exports = service;
