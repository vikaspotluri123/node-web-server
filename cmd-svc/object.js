if (!module.parent) {
	console.log('This is an internal utility.');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}

const {Service} = require('node-windows');
const path = require('path');

const service = new Service({
	name: 'Node Web Server',
	description: 'Minimal web server with functional firewall',
	script: path.join(__dirname, '..', '/index.js')
});

module.exports = service;
