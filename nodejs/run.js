var cluster = require('cluster');

cluster.setupMaster({exec: __dirname + '/bin/www'});

cluster.fork();


cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
});