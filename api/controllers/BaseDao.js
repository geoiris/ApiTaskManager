'use strict';

//Mongo Connection
var mongodb = require('mongodb');
var BPromise = require('bluebird');

// We promisify everything. Bluebird add ***Async function which return promises.
BPromise.promisifyAll(mongodb.Collection.prototype);
BPromise.promisifyAll(mongodb.MongoClient);

/**
 * Created by Team DOJO de ouf
 */
function BaseDAO(db, collectionName, config) {
    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof BaseDAO)) {
        return new BaseDAO(db);
    }

    this.collection = db.collection(collectionName);
}

/**
 * Find the fisrt element that corresponds to the criteria
 * @param criteria - find element that match these criteria
 * @param fields - fields for the projection
 * @returns {*}
 */
BaseDAO.prototype.findOne = function(criteria, fields) {
    if(fields) {
        return this.collection.findOneAsync(criteria, fields);
    } else {
        return this.collection.findOneAsync(criteria);
    }

};

/**
 * Find the elements that correspond to the criteria
 * @param query - Find the elements that correspond to the criteria
 * @param fields - fields for the projection
 * @param options - different options
 * @param sort - sort the result
 * @param limit - nb max element
 * @returns {*}
 */
BaseDAO.prototype.find = function(query, fields, options, sort, limit) {
    var resolver = BPromise.defer();
    var cursor = this.collection.find(query, fields, options);

    if(sort){
        cursor.sort(sort);
    }

    if(limit) {
        cursor.limit(limit);
    }

    cursor.toArray(function (err, docs) {
        if (err) {
            return resolver.reject(err);
        }
        return resolver.resolve(docs);
    });
    return resolver.promise;

};

/**
 * Save the document in the collection
 * @param doc - doc to save
 * @returns {*}
 */
BaseDAO.prototype.save = function(doc){
    return this.collection.saveAsync(doc, {}).then(function(result) {
        return result[0];
    }).catch(function(err) {
        throw err;
    });
};

/**
 * Remove the document in the collection
 * @param query - each element that match the query is deleted
 * @returns {*}
 */
BaseDAO.prototype.remove = function(query){
    return this.collection.removeAsync(query);
};

/**
 * Update the elements that correspond to the criteria
 * @param context - user datas for this session
 * @param query - each element that match the query is updated
 * @param fields - fields for the projection
 * @param options - options
 * @returns {*}
 */
BaseDAO.prototype.update = function(context, query, fields, options){
    try{
        return this.collection.updateAsync(query, fields, options).then(function(result) {
            return result[0];
        }).catch(function(err) {
            throw err;
        });
    } catch(exception){
        throw exception;
    }
};

module.exports.BaseDAO = BaseDAO;