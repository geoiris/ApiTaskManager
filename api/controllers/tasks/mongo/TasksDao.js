'use strict';

var baseDao = require('../../BaseDao');
var util = require('util');

var CONSTANT_COLLECTION_NAME = 'tasks';

function TasksDAO(db) {
    baseDao.BaseDAO.call(this, db, CONSTANT_COLLECTION_NAME);
}

util.inherits(TasksDAO, baseDao.BaseDAO);

module.exports.TasksDAO = TasksDAO;