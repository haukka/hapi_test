const hapi = require('hapi');

const server = new hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost',
    labels: ['web-app']
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
	reply('My first hapi app');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(request, reply) {
	reply('your name is : ' + request.params.name);
    }
});

server.start(function(err){
    if (err) {
	throw err;
    }
    console.log('hapi start on port 3000');
});

module.exports = server;
