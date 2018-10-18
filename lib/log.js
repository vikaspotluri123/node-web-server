const debug = require('debug');
const {accessLog, errorLog, log} = require('./config.js');
const {createWriteStream} = require('fs');

const shouldLog = Boolean(accessLog || errorLog);
const noop = () => true;
const nullWriter = {write: noop};``

const accessWriter = accessLog ? createWriteStream(accessLog, {flags: 'a'}) : nullWriter;
const errorWriter = errorLog ? createWriteStream(errorLog, {flags: 'a'}) : nullWriter;
const nullLogger = {
	error: noop,
	warn: noop,
	info: noop,
	debug: noop,
	everything: noop
}

module.exports = function generateDebuggers(name) {
	return log ? {
		error: debug(`ws:error:${name}`),
		warn: debug(`ws:warn:${name}`),
		info: console.log.bind(console, `[${name}]`),
		debug: debug(`ws:debug:${name}`),
		everything: debug(`ws:everything:${name}`)
	} : nullLogger;
};

module.exports.single = function generateSingleDebugger(type, name) {
	return log ? noop : debug(`ws:${type}:${name}`);
};

module.exports.toFile = function logToFile(data, error = false) {
	if (!shouldLog) {
		return true;
	}

	const logger = error ? errorWriter : accessWriter;
	return logger.write(data + '\n');
}
