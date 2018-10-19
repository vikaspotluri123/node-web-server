const service = require('./object');

function run(cb = () => true) {
	function done(err) {
		err || console.log('Service started');
		cb(err);
	}

	service.once('stop', done);
	service.once('error', done);

	service.restart();
}

if (!module.parent) {
	return run();
}

module.exports = run;
