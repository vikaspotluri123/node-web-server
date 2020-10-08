const service = require('./object');

function run(callback) {
	service.on('uninstall', () => {
		if (service.exists) {
			console.log('Service uninstalled but still exists');
		} else {
			console.log('Uninstall complete');
		}

		if (callback && typeof callback === 'function') {
			callback(service.exists);
		}
	});

	service.uninstall();
}

if (module.parent) {
	module.exports = run;
} else {
	run();
}
