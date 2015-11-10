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








// post request to the /test path
router.post('/', upload.single('MyFile'), function (req, res) {
	console.log('post request called');
	//console.log(req.file);
	/* exapmle req.file = 
	{ fieldname: 'MyFile',
	  originalname: '014a3527-c20c-44f3-8ec8-2baff8ee6827_s480x441.jpg',
	  encoding: '7bit',
	  mimetype: 'image/jpeg',
	  destination: 'uploads/',
	  filename: '95761d676050eda877b73bf19b683ceb',
	  path: 'uploads/95761d676050eda877b73bf19b683ceb',
	  size: 42337 
	};*/

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
   	
   	// read the file binary content
	fs.readFile(filePath, function(err, imageData) {
		
		// assign the binary data model field to the file binary 
		model.binary = imageData;
		
		//console.log("POST: model = " + JSON.stringify(model));
		// POST: model = {"binary":{"type":"Buffer","data":[255,216,255,224,0,16,74,70,73,70,0,1,1,1,
		
		//console.log("POST: model.binary = " + model.binary);
		//POST: model.binary = ����FIF,,��xPhotoshop 3.08BIM?ZG?08572120130611201306
		
		// return the image which shows in the browser
		//res.writeHead(200, {'Content-Type': model.mimeType });
		//res.end(model.binary);
		
		dal.create(model, function(result){
			res.writeHead(200, {'Content-Type': model.mimeType, 'Content-Description': model._id });
			res.end(model.binary);
		});

	});
	
	// remove the file from disk
	fs.unlink(filePath);
});



// RETURN AN IMAGE
router.get('/:id/image', function(req, res){
  	var id = req.params.id;
  	console.log('getImage, id = ' + id);
  	
  	dal.getImage(id, function(model){
  		console.log("GET /:id/image, fileName = " + model.fileName + ", size = " + model.size + ", mimeType = " + model.mimeType + ", model.binary = " + model.binary);
	    
	    var ideas = ['Binary', 'binary', 'base64', model.encoding];
	    var encoding =  ideas[2];
		var data = model.binary.toString(encoding); 

		console.log("encoding = " + encoding + ", data = " + data);
	    res.writeHead('200', {'Content-Type': model.mimeType});
        res.end(data, encoding);
	});
});

module.exports = router;