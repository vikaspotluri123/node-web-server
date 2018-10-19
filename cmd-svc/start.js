const service = require('./object');

function run(cb = () => true) {
	function done(err) {
		err || console.log('Service started');
		cb(err);
	}

	service.once('start', done);
	service.once('error', done);

	service.start();
}

if (!module.parent) {
	return run();
}

module.exports = run;
