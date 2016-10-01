var express = require('express');

var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Report =require('../models/report')
var Match =require('../models/match')
var Inte =require('../models/Inte')
var quiz =require('../models/quiz')
// Register
router.get('/register', function(req, res){
	res.render('register');
});
router.get('/about', function(req, res){
	res.render('about');
});
router.get('/match', function(req, res){
	res.render('multiple_type');
});
router.get('/Inte', function(req, res){
	res.render('integer');
});

router.get('/report', function(req, res){
	res.render('report');
});

router.get('/redirect', function(req, res){
	// if(req.body.type=="DOCTOR")
	// 	res.redirect('report');
	// 	if(user.type=="PATIENT")
	// 	res.redirect('history');
	// if(user.type=="CHEMIST")
	// 	res.redirect('medicine');
});

router.get('/dashboard', function(req, res){
	res.render('dashboard');
});

router.get('/quiz', function(req, res){
	res.render('quiz');
});
// Login
router.get('/login', function(req, res){
	console.log("User at opened webisite at  "+req.ip);
	res.render('login');
});


//get time

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
// getting ip
var getIP = require('ipware')().get_ip;
router.use(function(req, res, next) {
    var ipInfo = getIP(req);
   // console.log(ipInfo);
    global.ip=ipInfo;
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});



// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var type =req.body.type.toUpperCase();
	var time = getDateTime();
	var roll = req.body.roll;
	var ip =req.ip;
	// var ip = getIP;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('type', 'type is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
    // if(type!="doctor" || type!="patient" || type!="chemist")
    // {
    // 	req.flash('error_msg', 'You entered wrong type please enter Doctor or Patient or Chemist');
    // 	res.redirect('/users/register');
    // }
	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password,
			type : type,
			time :time,
			roll : roll,
			ip : ip

		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log("|---------------------------------------------------------------------------------")
			console.log("|User Registered with following credential at "+user.time);
			console.log("|IP: "+req.ip);
			console.log("|Name: "+user.name);
			console.log("|Email: "+user.email);
			console.log("|Username: "+user.username);
			console.log("|Type: "+user.type);
			console.log('|User-Agent: ' + req.headers['user-agent']);
			console.log("|----------------------------------------------------------------------------------")


		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});
//getting report

router.post('/report', function(req, res){
	var question = req.body.question;
	var option_1 = req.body.option_1;
	var option_2 = req.body.option_2;
	var option_3 = req.body.option_3;
	var option_4= req.body.option_4;
	var correct = req.body.correct;
	var time = getDateTime();
	// var ip = getIP;

	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('type', 'type is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	//var errors = req.validationErrors();
    // if(type!="doctor" || type!="patient" || type!="chemist")
    // {
    // 	req.flash('error_msg', 'You entered wrong type please enter Doctor or Patient or Chemist');
    // 	res.redirect('/users/register');
    // }
	// if(errors){
	// 	res.render('doctor',{
	// 		errors:errors
	// 	});
	// } else {
		var newReport = new Report({
			option_1: option_1,
			option_2:option_2,
			option_3: option_3,
			option_4: option_4,
            correct : correct,
            question : question,
			time : time

		//x
	});

console.log(req.body.time);
console.log(req.time);
// console.log(report.time);
// console.log(report.body.time);



		Report.createReport(newReport, function(err, user){
			if(err) throw err;
			console.log("|---------------------------------------------------------------------------------")
			console.log("|QUIZ submiited with following question at "+req.time);
			console.log("|IP: "+req.ip);
			console.log("|Question: "+req.body.question+" ?");
			console.log("|option_1: "+req.body.option_1);
			console.log("|option_2: "+req.body.option_2);
			console.log("|option_3: "+req.body.option_3);
			console.log("|option_4: "+req.body.option_4);
	        console.log("|correct: "+req.body.correct);
			console.log('|User-Agent: ' + req.headers['user-agent']);
			console.log("|----------------------------------------------------------------------------------")


		});

		req.flash('success_msg', 'You Have submiited the MCQ');

		res.redirect('/');
	});

 



router.post('/Inte', function(req, res){
	var question = req.body.question;
	var answer = req.body.answer;
	
	var time = getDateTime();
	// var ip = getIP;

	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('type', 'type is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	//var errors = req.validationErrors();
    // if(type!="doctor" || type!="patient" || type!="chemist")
    // {
    // 	req.flash('error_msg', 'You entered wrong type please enter Doctor or Patient or Chemist');
    // 	res.redirect('/users/register');
    // }
	// if(errors){
	// 	res.render('doctor',{
	// 		errors:errors
	// 	});
	// } else {
		var newInte = new Inte({
			
            answer : answer,
            question : question,
			time : time

		//x
	});

console.log(req.body.time);
console.log(req.time);
// console.log(report.time);
// console.log(report.body.time);



		Inte.createInte(newInte, function(err, user){
			if(err) throw err;
			console.log("|---------------------------------------------------------------------------------")
			console.log("|QUIZ submiited with following question at ");
			console.log("|IP: "+req.ip);
			console.log("|Question : "+req.body.question+"?");
	        console.log("|correct: "+req.body.correct);
			console.log('|User-Agent: ' + req.headers['user-agent']);
			console.log("|----------------------------------------------------------------------------------")


		});

		req.flash('success_msg', 'You Have submiited the Integer type question');

		res.redirect('/');
	});







router.post('/match', function(req, res){
	
	var option_1 = req.body.option_1;
	var option_2 = req.body.option_2;
	var option_3 = req.body.option_3;
	var option_4= req.body.option_4;
	var option_5= req.body.option_5;
	var option_A= req.body.option_A;
	var option_B = req.body.option_B;
	var option_C = req.body.option_C;
	var option_D = req.body.option_D;
	var option_E= req.body.option_E;
	var answer = req.body.answer;
	var time = getDateTime();
	// var ip = getIP;

	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('type', 'type is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	//var errors = req.validationErrors();
    // if(type!="doctor" || type!="patient" || type!="chemist")
    // {
    // 	req.flash('error_msg', 'You entered wrong type please enter Doctor or Patient or Chemist');
    // 	res.redirect('/users/register');
    // }
	// if(errors){
	// 	res.render('doctor',{
	// 		errors:errors
	// 	});
	// } else {
		var newMatch = new Match({
			key: reportPrimaryKey,
			option_1: option_1,
			option_2:option_2,
			option_3: option_3,
			option_4: option_4,
            option_5: option_5,
            option_A: option_A,
			option_B:option_B,
			option_C: option_C,
			option_D: option_D,
            option_E: option_E,
			
         answer: answer,
			time : time

		//x
	});

// console.log(req.body.time);
// console.log(req.time);
// console.log(report.time);
// console.log(report.body.time);



		Match.createMatch(newMatch, function(err, user){
			if(err) throw err;
			console.log("|---------------------------------------------------------------------------------")
			console.log("|QUIZ submiited with following question at ");
			console.log("|IP: "+req.ip);
			console.log("|ID: "+req.body.question);
			console.log("| "+req.body.option_1+" : "+req.body.option_A);
			console.log("| "+req.body.option_1+" : "+req.body.option_B);
			console.log("| "+req.body.option_1+" : "+req.body.option_C);
			console.log("| "+req.body.option_1+" : "+req.body.option_D);
			console.log("| "+req.body.option_1+" : "+req.body.option_E);
	        console.log("|correct: "+req.body.correct);
			console.log('|User-Agent: ' + req.headers['user-agent']);
			console.log("|----------------------------------------------------------------------------------")


		});

		req.flash('success_msg', 'You Have submiited the Match-Matrix');

		res.redirect('/');
	});



console.log(Report.getReportByRandom(1,function(err,req){
  if(err) throw err;
}));

//
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/dashboard', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {

    res.redirect('/dashboard',{user:user});
  });

router.get('/logout', function(req, res){

            console.log("|---------------------------------------------------------------------------------")
			console.log("|User Logout at "+req.user.time);
			console.log("|IP: "+req.ip);
			console.log("|Name: "+req.user.name);
			console.log("|Email: "+req.user.email);
			console.log("|Username: "+req.user.username);
			console.log("|Type: "+req.user.type);
			console.log('|User-Agent: ' + req.headers['user-agent']);
			console.log("|----------------------------------------------------------------------------------")


	req.logout();
            
	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
