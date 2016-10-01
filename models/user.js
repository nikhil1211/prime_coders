var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// var random = require('mongoose-random');
// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	type: {
		type: String
	},
	time :{
		type:String
	},
	ip :{
		type : String
	},
	roll :{
		type : String
	}
});


// UserSchema.plugin(random, { path: 'r' });
// var ran = mongoose.model('ran',UserSchema);
// ran.findRandom().limit(10).exec(function (err, username) {
//   console.log(username);
// });

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

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