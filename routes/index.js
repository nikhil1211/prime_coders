var express = require('express');
var router = express.Router();
var ip = require('ip');

 
 var satelize = require('satelize');
var iitk = ip.address();
iitk = iitk.split('.').join("");

router.get('/', ensureAuthenticated, function(req, res){

	if(req.user.type==="professor")
	{
		res.render('report');
	}
	if(req.user.type==="student")
	{
		res.render('student');
	}
	

	var atoi = function atoi(addr) {
  var parts = addr.split('.').map(function(str) {
    return parseInt(str); 
  });

  return (parts[0] ? parts[0] << 24 : 0) +
         (parts[1] ? parts[1] << 16 : 0) +
         (parts[2] ? parts[2] << 8  : 0) +
          parts[3];
};

var checkIpaddrInRange = function checkIpaddrInRange(ipaddr, start, end) {
  var num = atoi(ipaddr);
  return (num >= atoi(start)) && (num <= atoi(end));
}

if(checkIpaddrInRange(req.ip, '127.0.0.1', '127.0.0.1'))

{
	var location="SERVER NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.32.2', '172.24.34.17'))

{
	var location="HALL-5 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.0.2', '172.24.1.239'))
	
{
	var location="HALL-1 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.8.2', '172.24.9.253'))
	
{
	var location="HALL-2 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.16.2', '172.24.17.253'))
	
{
	var location="HALL-3 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.24.2', '172.24.25.260'))
	
{
	var location="HALL-4 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.24.2', '172.24.25.260'))
	
{
	var location="HALL-6 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.48.2', '172.24.49.235'))
	
{
	var location="HALL-7 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.56.2', '172.24.58.10'))
	
{
	var location="HALL-8 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.64.2', '172.24.66.3'))
	
{
	var location="HALL-9 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.69.2', '172.24.70.169'))
	
{
	var location="HALL-10 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.24.136.2', '172.24.138.18'))
	
{
	var location="HALL-11 NETWORK"
}
if(checkIpaddrInRange(req.ip, '172.28.64.2', '172.28.64.14'))
	
{
	var location="LIBRARY NETWORK"
}



	
	console.log("|-----------------------------------------------------------------------");
	console.log("|User logged at "+req.user.time+" IN "+location);
	console.log("|IP: "+req.ip);
	console.log("|Name: "+req.user.name);
	console.log("|Email: "+req.user.email);
	console.log("|Username: "+req.user.username);
	console.log("|Type: "+req.user.type);
	console.log('|User-Agent: ' + req.headers['user-agent']);
	console.log("|------------------------------------------------------------------------");
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;