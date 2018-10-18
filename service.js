const LOG_PATH = `${__dirname}/service.log`;
const {Service} = require('node-windows');
const {createWriteStream} = require('fs');
const service = new Service({
  name:'Node Web Server',
  description: 'Minimal web server with functional firewall',
  script: `${__dirname}/index.js`,
});

service.on('install',() => service.start());
service.on('error', error => {
	const stream = createWriteStream(LOG_PATH, {flags: 'a'}).write(error.trace() + '\n\n');
});

service.install();
