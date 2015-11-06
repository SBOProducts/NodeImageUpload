var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })



// the route handler for get requests
router.get('/', function(req, res){
	console.log('get request handler');
	console.log('req.app is the instance of express from the app.js level');
  	res.send('hello world');
});

// post request to the /test path
router.post('/', upload.single('MyFile'), function (req, res) {
	console.log('post request called');
	console.log(req.file);  	
  	res.send('POST request handler');
});


module.exports = router;