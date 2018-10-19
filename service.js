const LOG_PATH = `${__dirname}/service.log`;
const {createWriteStream} = require('fs');
const service = require('./cmd-svc/object');

function run(cb = () => true) {
	service.on('install', () => {
		service.start();
		if(cb && typeof cb === 'function') {
			cb();
		}
	});
	service.on('error', error => {
		createWriteStream(LOG_PATH, {flags: 'a'}).write(error.trace() + '\n\n');
	});

	service.install();
}

if (module.parent) {
	return run();
}

module.exports = run;
