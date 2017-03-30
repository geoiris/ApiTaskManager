'use strict';

var _ = require('lodash');
var mongo = require('../../../../mongo');
var TasksDAO = require('./TasksDao').TasksDAO;
var ObjectID = require('mongodb').ObjectID;

/**
 * Get All tasks
 */
function getAll(){
	return mongo.getDao(TasksDAO).then(function(tasksDAO) {
		var query = {};
		return tasksDAO.find(query).then(function(tasks){
			if(_.isEmpty(tasks)){
				return [];
			}
			return tasks;
		});
	});
}

/**
 * Updating an existing task in the bdd
 * @param {object} task - the task to update
 */
function update(task){
	return mongo.getDao(TasksDAO).then(function(tasksDAO) {
		var taskWithObjectId = _.clone(task,true);
        taskWithObjectId._id = new ObjectID(task._id);
		return tasksDAO.save(taskWithObjectId);
	});
}

function add(task){
    return mongo.getDao(TasksDAO).then(function(tasksDAO) {
        return tasksDAO.save(task);
    });
}

/**
 * Remove an url by id
 * @param {string} id - criteria in order to remove an url - corresponds to the urlId field in the mongodb collection
 */
function remove(id){
	return mongo.getDao(TasksDAO).then(function(tasksDAO) {
		return tasksDAO.remove({_id:new ObjectID(id)});
	});
}

exports.getAll = getAll;
exports.remove = remove;
exports.update = update;
exports.add = add;