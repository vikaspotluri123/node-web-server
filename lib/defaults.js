module.exports = {
	config: {
		lockdown: true,
		log: true,
		port: 80,
		blacklist: [],
		whitelist: [],
		accessLog: false,
		errorLog: false
	},
	host: {
		action: {
			type: 'function',
			source: './noop-route.js'
		}
	}
};
