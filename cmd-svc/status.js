const service = require('./object');

function run() {
	console.log(`Exists: ${service.exists}`);
}

if (!module.parent) {
	return run();
}

module.exports = run;
