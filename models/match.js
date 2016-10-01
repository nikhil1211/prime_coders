var mongoose = require('mongoose');


// User Schema
var report_primary = 1;
var MatchSchema = mongoose.Schema({
	
	option_1: {
		type: String
	},
	option_2: {
		type: String
	},
	option_3:{
		type:String
	},
	option_4:{
		type:String
	},
	option_5: {
		type: String
	},
	option_A: {
		type: String
	},
	option_B:{
		type:String
	},
	option_C:{
		type:String
	},
	option_D: {
		type: String
	},
	option_E: {
		type: String
	},
    answer:{
		type:String
	},
	quiz_name :
	{
		type : String
	},

	time :{
		type : String
	},
	q_type :
	{
		type:String,
		default:'match'
	}

});

var Match = module.exports = mongoose.model('Match', MatchSchema);

module.exports.createMatch = function(newMatch, callback){
	
	        newMatch.save(callback);
	  
};

module.exports.getMatchById = function(id, callback){
	var query = {id: id};
	Match.findOne(query, callback);
}
