const service = require('./object');

function run() {
	console.log(`Exists: ${service.exists}`);
}

if (module.parent) {
	module.exports = run;
} else {
	run();
}
