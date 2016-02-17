const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost'
});

const home_page = function (req, reply) {
     reply.view('index', {
         title: 'index.js | Hapi ' + req.server.version,
         message: 'Hello World!'
     });
};

server.register(require('vision'), (err) => {
    if (err) {
	throw err;
    }

    server.views({
	engines: {ejs: require('ejs')},
	relativeTo: __dirname,
	path: 'views'
    });

    server.route({method: 'GET', path: '/', handler: home_page });
});

server.start(function(err){
    if (err) {
	throw err;
    }
    console.log('hapi start on port 3000');
});
