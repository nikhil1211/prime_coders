var mongoose = require('mongoose');
var random = require('mongoose-random');

// User Schema
var match_primary = 1;
var MatchSchema = mongoose.Schema({
	description :
	{
		type : String,
	},
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
MatchSchema.plugin(random, { path: 'r' });
var ran = mongoose.model('ran',MatchSchema);
ran.findRandom().limit(10).exec(function (err, matches) {
  console.log(matches);
});


var Match = module.exports = mongoose.model('Match', MatchSchema);

module.exports.createMatch = function(newMatch, callback){
	
	        newMatch.save(callback);
	  
};

module.exports.getMatchById = function(id, callback){
	var query = {id: id};
	Match.findOne(query, callback);
}
