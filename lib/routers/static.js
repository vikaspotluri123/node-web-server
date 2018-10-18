const ecstatic = require('ecstatic');

module.exports = config => {
	const cb = ecstatic(config);
	return (req, res, log) => {
		log('Dispatching request to ecstatic');
		cb(req, res);
	};
};
