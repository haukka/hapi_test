const hapi = require('hapi');
const joi = require('joi');
const server = new hapi.Server();

const dboptions = {
    "url": "mongodb://localhost:27017/todohapi",
    "settings": {
	"db": {
	    "native_parser": false
	}
    }
};

server.connection({
    port: 3000,
    host: 'localhost',
    labels: ['todo-app']
});


function getOne(req, reply) {
    var elemId = req.params.id
    var query = req.server.plugins['hapi-mongodb'].db;
    var ObjectID = req.server.plugins['hapi-mongodb'].ObjectID;

    query.collection('lists').findOne({ "_id" : new ObjectID(elemId) }, function(err, res) {
	if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
	reply(res);
    });
};

function deleteItem(req, reply) {
    var elemId = req.params.id;
    var query = req.server.plugins['hapi-mongodb'].db;
    var ObjectID = req.server.plugins['hapi-mongodb'].ObjectID;
	
    query.collection('lists').remove({"_id": new ObjectID(elemId)}, function (err){
	if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
	reply("Elem Deleted");
    });
}

function createItem(req, reply) {
    var AddElem = {
	list: req.payload.list
    };
    var query = req.server.plugins['hapi-mongodb'].db;
    query.collection('lists').insert(AddElem, {w:1}, function (err, doc){
	if (err){
	    return reply(Hapi.error.internal('Internal MongoDB error', err));
	}else{
	    reply(doc);
	}
    });
}

function getAll(req, reply) {
    var query = req.server.plugins['hapi-mongodb'].db;
    query.collection('lists').find().toArray(function (err, doc) {
	reply(doc);
    });
}

server.route({
    method: 'GET',
    path: '/todos',
    handler: getAll
});

server.route({
    method: 'GET',
    path: '/todo/{id}',
    handler: getOne
});

server.route({
    method: 'DELETE',
    path: '/todo/{id}',
    handler: deleteItem
});

server.route({
    method: 'POST',
    path: '/todos',
    config: {
	handler: createItem
    }
});

function launch_serv() {
    server.start(function(err){
	if (err)
	    throw err;
	console.log('hapi start on port 3000');
    });
}

server.register({
    register: require('hapi-mongodb'),
    options: dboptions
}, function(err) {
    if (err) {
	console.error(err);
	throw err;
    }
    launch_serv();
});
