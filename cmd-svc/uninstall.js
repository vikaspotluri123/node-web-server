const service = require('./object');

function run(cb) {
	service.on('uninstall', () => {
		if (service.exists) {
			console.log('Service uninstalled but still exists');
		} else {
			console.log('Uninstall complete');
		}

		if (cb && typeof cb === 'function') {
			cb(service.exists);
		}
	});

	service.uninstall();
}

if (!module.parent) {
	return run();
}

module.exports = run;
