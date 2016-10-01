var mongoose = require('mongoose');
var async = require('async');

// var random = require('mongoose-simple-random');

// User Schema
var report_primary = 1;

var ReportSchema = mongoose.Schema({
	key: {
		type: String
	},
	question: {
		type: String,
		index:true
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
    correct:{
		type:String
	},
	quiz_name :
	{
		type : String
	},

	time :{
		type : String
	},
	q_type :{
		type : String,
		default:'mcq'
	}
});
// ReportSchema.plugin(random);
// var Test = mongoose.model('Test', ReportSchema);


var Report = module.exports = mongoose.model('Report', ReportSchema);

module.exports.createReport = function(newReport, callback){
	
	        newReport.save(callback);
	  
};

module.exports.getReportById = function(id, callback){
	var query = {id: id};
	Report.findOne(query, callback);
}
module.exports.getReportByType = function(type, callback){
	var query = {type: type};
	Report.findOne(query, callback);
}

// Report.statics.random = function(cb) {
//   this.count(function(err, count) {
//     if (err) return cb(err);
//     var rand = Math.floor(Math.random() * count);
//     this.findOne().skip(rand).exec(cb);
//   }.bind(this));
// };
// console.log(Report.statics.random);
// module.exports.getReportByRandom = function(type, callback){
	// var query = {type: type};
// 	var query = {
//     state: 'OK',
//     rnd: {
//         $gte: Math.random()
//     }
// };

// var randomElement = Report.findOne({ $query: query, $orderby: { rnd: 1 } });
// console.log(randomElement);
// }

