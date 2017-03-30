'use strict';

var express = require('express');
var bodyParser = require('body-parser') ;
var router = express.Router();
var routes = require('./api/routes/index');
var app = express();
var http=require('http');

app.use(function(req,res,next){	
	res.setHeader("api-version", require('./package.json').version);
	next();
});

// Authorise les requêtes cross domaine
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.json());
app.use('/', express.static('site'));
app.use('/api', router);

routes(router);

var port = 5555;
app.listen(port, function(){
	console.log("Listenning on port: " + port);
});

/**
 * Allow to catch uncaughtException Exception
 */
process.on('uncaughtException', function(error){
    console.log(error);
    setTimeout(process.exit, 5000, 1);
});