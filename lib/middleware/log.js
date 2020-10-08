const onEnd = require('on-finished');
const {log} = require('../config.js');
const {toFile} = require('../log.js');

module.exports = function logRequest(host, request, response) {
	onEnd(response, () => {
		const {method, url, connection: {remoteAddress}} = request;
		const {statusCode} = response;
		const message = `${method.toUpperCase()} ${host}${url} (${statusCode}) from ${remoteAddress}`;
		const date = `[${new Date().toLocaleString()}]`;

		if (log) {
			console.log(date, message);
		}

		toFile(message, false);
	});
	return true;
};
