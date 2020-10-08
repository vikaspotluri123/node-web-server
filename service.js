const LOG_PATH = require('path').join(__dirname, 'service.log');
const {createWriteStream} = require('fs');
const service = require('./cmd-svc/object');

function run(callback = () => true) {
	service.on('install', () => {
		service.start();
		if (callback && typeof callback === 'function') {
			callback();
		}
	});
	service.on('error', error => {
		createWriteStream(LOG_PATH, {flags: 'a'}).write(error.trace() + '\n\n');
	});

	service.install();
}

if (module.parent) {
	module.exports = run;
} else {
	run();
}

