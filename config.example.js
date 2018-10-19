module.exports = {
	port: 80,
	accessLog: "C:\\logs\\nwsa.log",
	errorLog: "C:\\logs\\nwse.log",
	log: false, // This disables logging to file, not service logging :)
	hosts: [{
		name: 'proxy',
		action: {
			type: 'function',
			source: 'C:\\Program Files (x86)\\node-web-server\\custom\\proxy.js'
		}
	}, {
		name: 'static',
		action: {
			type: 'internal',
			name: 'static',
			config: {
				root: 'C:\\static-assets',
				showDotFiles: false,
				showDir: true,
				autoIndex: true
			}
		}
	}]
};
