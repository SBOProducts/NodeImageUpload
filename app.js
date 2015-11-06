var express = require('express');
var app = express();

app.listen(3000);

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
})

// return static files from the public folder
app.use(express.static(__dirname + '/public'));

// get request to the /test path
app.get('/test', function(req, res){
	console.log('get request called');
	console.log('req.app holds a reference to the express app instantiated at the app.js level');
  	res.send('hello world');
});

// post request to the /test path
app.post('/test', function (req, res) {
	console.log('post request called');
  	res.send('POST request to homepage');
});

// hook up express app to the expport
module.exports = app;

// show that we're started
console.log("The app is up and running!");
