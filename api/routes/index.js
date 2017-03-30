'use strict';

var tasks = require('../controllers/tasks.ctrl');

module.exports = function(router) {
	// Get the version of the application from the package.json file
	router.get('/version', function (req, res, next) {
        var currentVersion = {"version":require('../../package.json').version};
		console.log(currentVersion);
    	res.json(currentVersion);
    });

    // Get all tasks
    router.get('/tasks', function (req, res, next) {
		tasks.getAll().then(function(datas){
			res.json(datas);
    	});
    });

    // Delete one task
	router.delete('/tasks/:id', function (req, res, next) {
		tasks.remove(req.params.id).then(function(datas){
			res.json(datas);
    	});
    });

    // Add a task
	router.post('/tasks/', function (req, res) {
		tasks.add(req.body).then(function(datas){
			res.json(datas);
    	});
    });

    // Update a task
    router.put('/tasks/', function (req, res) {
        tasks.update(req.body).then(function(datas){
            res.json(datas);
        });
    });
};