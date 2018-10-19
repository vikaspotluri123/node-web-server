# Node Web Server

Dead simple node web server for development

Note: Node Web Server has security in mind but provides no guarantees of security. Use this at your own risk

# Installation

## Minimal

You can clone Node Web Server using git and run it manually, but this requires you to have a terminal always open and start it manually. If you want to do it this way, just run

```bash
git clone https://github.com/vikaspotluri123/node-web-server
cd node-web-server

# Install dependencies, of course. There aren't that many!
yarn install --production
```

After that, [configure](#configure) node-web-server and start it (`node index.js`)

## Service

You can install node-web-server as a service (currently Windows only) to make it persistent. To do this, you will need an elevated shell, and to minimize the likeliness of module tampering, you should apply security restrictions to the installed folder (i.e. `chmod 664 node-web-server`)

```bash
git clone https://github.com/vikaspotluri123/node-web-server
cd node-web-server

# Install dependencies, of course. There aren't that many!
yarn install --production

# Register the service and start it
node ./service.js
```

You can manage the state of the service using the modules in `./cmd-svc/`

```bash
node ./cmd-svc/{item}

# Items:
# - start
# - stop
# - restart // flaky
# - status // Whether the service exists or not
# - install // just runs ../service.js
# - uninstall
# - reinstall
```
If you need to move the install location, make sure you uninstall the service first!

Service-related tasks are managed via [node-windows](https://github.com/coreybutler/node-windows)

# Config

Copy `config.example.js` to `config.js`

Here are the defaults:

```js
lockdown: true, // Only allow connections from your perceived IP address
log: true, // Write requests to log file (will always write to console)
port: 80, // Port to listen on
blacklist: [], // IP Blacklist
whitelist: [], // IP Whitelist
accessLog: false, // location of access log / should write to access log? log takes precedence
errorLog: false // location of error log / should write to error log? log takes precedence
```

## Hosts

node-web-server is designed to execute based on hosts. Here is an example host:

```js
hosts: [{
  name: 'proxy', // hostname to equal
  action: {
    type: 'function', // can be internal or function
    source: 'C:\\Program Files (x86)\\node-web-server\\custom\\proxy.js'
  }
}]
```

The action key determines how node-web-server responds.

If you use the `internal` type, you can choose between `default` and `static`.

`default` will just return `Node Web Server v0.1`

`static` will proxy requests to [ecstatic](https://github.com/jfhbrook/node-ecstatic), initializing it with properties in the `config` key

If you use the `function` type, arbitrary code will be executed. This is intentional, so be careful. If you can, limit the permissions of the executed function (i.e. chmod)

If the type is function, there should be a `source` key which is the path to the node module that contains the handler.

The handler will be called with `handle(req, res, logProxy)` where `logProxy` can be used to write to the log.

# Debugging

If you're looking to debug the node-web-server, extensive logging is done via the debug module. In bash, run `DEBUG=ws:* node index.js` to enable node-web-server debugging

# Security

If you find any security issues, please contact me - [vikaspotluri123.github@gmail.com](mailto:vikaspotluri123.github@gmail.com). My PGP Key is available on [pgp.mit.edu](https://pgp.mit.edu/pks/lookup?op=get&search=0xF91EB1B158E08FE2) if want to use it

# Issues + Contributing

Feel free to contribute or create an issue. Please be detailed but don't go overboard :)