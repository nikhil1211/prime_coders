var mongoose = require('mongoose');


// User Schema
var Integer_primary = 1;
var InteSchema = mongoose.Schema({
	
	question: {
		type: String
	},
	answer: {
		type: Number
	},
	
	time :{
		type : String
	},
	q_type :
	{
		type:String,
		default:'Integer'
	}

});

var Inte = module.exports = mongoose.model('Inte', InteSchema);

module.exports.createInte = function(newInte, callback){
	
	        newInte.save(callback);
};

// module.exports.getInteById = function(id, callback){
// 	var query = {id: id};
// 	Inte.findOne(query, callback);
// }
