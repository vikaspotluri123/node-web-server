const interfaces = require('../interfaces.js');
const log = require('../log.js');
const {lockdown, whitelist, blacklist} = require('../config');

module.exports = function filterRequest(unused, request, response) {
	const primaryAddress = request.connection.remoteAddress;
	const secondaryAddress = primaryAddress.replace('::ffff:', '');

	if (lockdown && (
		(blacklist.includes(primaryAddress) || blacklist.includes(secondaryAddress)) ||

		!(whitelist.includes(primaryAddress) || whitelist.includes(secondaryAddress) ||
		interfaces.includes(primaryAddress) || interfaces.includes(secondaryAddress))
	)) {
		log.toFile(`!!! ${primaryAddress} | ${secondaryAddress} attempted access !!!`);
		response.statusCode = 403;
		response.end('<h1>IP Not Allowed</h1>');
		return false;
	}

	return true;
};
