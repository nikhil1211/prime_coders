var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var r  = require('./report');

// module.exports.findRandomQuestions = function(username, callback){
// 	var rQuestion = Report.findOne({key: rand()%reportPrimaryKey} + 1,)

// }

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}
module.exports.getUserByType = function(type, callback){
	var query = {type: type};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}