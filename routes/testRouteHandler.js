var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var fs = require('fs');
var path = require('path');
var dal = require('../dal/imageDAL');


// the route handler for get requests
router.get('/:id', function(req, res){
  	var id = req.params.id;
  	console.log('get, id = ' + id);
  	dal.getById(id, function(result){
  		console.log("dal.getById result, fileName = " + result.fileName);
	    res.send(result);
  	});
});




// the route handler for get requests
router.get('/:id/image', function(req, res){
  	var id = req.params.id;
  	console.log('getImage, id = ' + id);
  	
  	dal.getById(id, function(result){
  		res.writeHead(200, {'Content-Type': result.mimeType });
  		var buff = new Buffer(result.binary, 'binary');
  		console.log("buff: " + result.binary);
  		res.end(buff, 'binary');
  	});
  	
  	/*
  	dal.getImage(id, function(result, binary){
  		console.log("dal.getImage result, fileName = " + result.fileName + ", size = " + result.size + ", mimeType = " + result.mimeType);
  		res.writeHead(200, {'Content-Type': result.mimeType });
  		console.log("binary length = " + binary.length);
	    res.end(binary, 'binary');
  	});*/
});




// post request to the /test path
router.post('/', upload.single('MyFile'), function (req, res) {
	console.log('post request called');
	console.log(req.file);

	// read from disk
	var id = req.file.filename;
  	var filePath = './uploads/' + id;
   	
   	// create the data model
   	var model = {
		binary: null,
		fileName: req.file.originalname,
		encoding: req.file.encoding,
		mimeType: req.file.mimetype,
		size: req.file.size,
		encoding: req.file.encoding
	};
   	
   	// post to dal
	fs.readFile(filePath, function(err, imageData) {
		dal.create(model, imageData, function(result){
			res.send({'result': result});	
		});
	});
	
	// remove the file from disk
	fs.unlink(filePath);
});


module.exports = router;