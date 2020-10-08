const install = require('../service');
const uninstall = require('./uninstall');

function run() {
	uninstall(install);
}

if (module.parent) {
	module.exports = run;
} else {
	run();
}
