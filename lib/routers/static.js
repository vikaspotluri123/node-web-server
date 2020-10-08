const ecstatic = require('ecstatic');

module.exports = config => {
	const cb = ecstatic(config);
	return (request, response, log) => {
		log('Dispatching request to ecstatic');
		cb(request, response);
	};
};
