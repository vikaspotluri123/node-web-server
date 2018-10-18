const {createServer} = require('http');
const {parse} = require('url');
const loggerFor = require('./log.js');
const {port} = require('./config.js');
const router = require('./router.js');

const {info} = loggerFor('server');

router.initialize();

const server = createServer((request, response) => {
	const {host} = request.headers;
	const {hostname} = parse(`http://${host}`);
	return router.route(hostname, request, response);
});

server.listen(port, '0.0.0.0', () => info('Listening (ipV4) on port', port));
server.listen(port, '::', () => info('Listening (ipV6) on port', port));

module.exports = server;
