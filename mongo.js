var BPromise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
BPromise.promisifyAll(MongoClient);

var db= null;
const connexionString = 'mongodb://localhost/tasksmanager';

/**
 * Instantiate the connection to the bdd
 */
function getDb() {
	if(db){
		return db;
	}
	db = new BPromise(function (resolve, reject) {
		MongoClient.connect(connexionString, function(err,db){
			if(err){
                reject(err);
			} else {
                resolve(db);
			}
		});
	});
	
	return db;
}


/**
 * Build the right DAO and link it with the right bdd connection
 */
function getDao(Dao) {
  return getDb().then(function(db) {
    return new Dao(db);
  }).catch(function(eerrr){
  	console.log(eerrr);
  });
}

exports.getDao = getDao;