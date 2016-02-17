const Lab = require("lab");
const lab = exports.lab = Lab.script();
const Code = require("code");
const server = require("../hapi.js");

lab.experiment("Basic test hapi", function(){
    lab.test("GET /{name*} (endpoint test)", function(done){
	var options = {
	    method: "GET",
	    url: "/toto"
	};

	server.inject(options, function(res){
	    Code.expect(res.statusCode).to.equal(200);
	    done();
	});
    });

    lab.test("GET / (endpoint test)", function(done){
	var options = {
	    method: "GET",
	    url: "/"
	};
	
	server.inject(options, function(res){
	    Code.expect(res.statusCode).to.equal(200);
	    done();
	});
    });
});
