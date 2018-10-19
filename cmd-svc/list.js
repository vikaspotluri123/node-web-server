const {list} = require('node-windows');
list(svc => console.log(svc), true);
