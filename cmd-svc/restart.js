const service = require('./object');

function run(callback = () => true) {
	function done(error) {
		if (!error) {
			console.log('Service started');
		}

		callback(error);
	}

	service.once('stop', done);
	service.once('error', done);

	service.restart();
}

if (module.parent) {
	module.exports = run;
} else {
	run();
}
