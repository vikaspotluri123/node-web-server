const log = require('./log');
const {host: defaultHost} = require('./defaults.js');
const {log: logRequest, firewall} = require('./middleware');
const defaultRoute = require('./routers/default')();

const {debug: routeDebug} = log('router:route');
const handlerLog = log.single('route', 'handler');

let routes;

const isValidAction = ({type} = false) => ['function', 'internal'].includes(type);

function getHandler({type, name, config, source}, logError) {
	let handler;

	if (type === 'function') {
		const handlerSource = source.replace('{cwd}', process.cwd());
		handler = require(handlerSource);
	} else if (type === 'internal') {
		if (!['default', 'static'].includes(name)) {
			throw new TypeError(`Action "${name}" is not supported`);
		}

		handler = require(`./routers/${name}.js`)(config);
	}

	if (typeof handler !== 'function') {
		logError(`action handler is not okay: ${name}`);
		throw new TypeError('Handler is not a function');
	}

	return handler;
}

module.exports.route = function route(host, request, response) {
	if (!(logRequest(host, request, response) && firewall(host, request, response))) {
		return;
	}

	routeDebug(`Routing request for host "${host}"`);

	let handler;
	if (routes[host]) {
		routeDebug(`Route for host "${host}" found`);
		handler = routes[host];
	} else {
		routeDebug(`No route for host "${host}" found`);
		handler = routes.fallback;
	}

	return handler(request, response, handlerLog);
};

module.exports.initialize = function initialize() {
	const {hosts} = require('./config.js');
	if (!Array.isArray(hosts)) {
		throw new TypeError('Hosts must be an array');
	}

	routes = {fallback: defaultRoute};
	const {error, warn, debug, everything} = log('router:init');

	hosts.forEach(host => {
		everything('Processing host:', host);
		const options = Object.assign({}, defaultHost, host);
		const {name: hostName, action} = options;

		if (!isValidAction(action)) {
			error(`action is not okay: ${action}`);
			throw new TypeError('specified action is not supported');
		}

		const handler = getHandler(action, error);

		if (routes[hostName]) {
			warn(`HostName ${hostName} already exists: ${routes[hostName].name} - overwriting with ${handler.name}`);
		}

		routes[hostName] = handler;
	});

	debug('Finished loading routes');
	everything('Routes:', routes);
};
