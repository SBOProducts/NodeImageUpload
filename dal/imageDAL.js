var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nodeImageUpload';
var collectionName = 'Images';


var galleryDAL = {
    
    // creates a new item
    create: function(model, callback){
        
        MongoClient.connect(url, function(err, db) {
       
            var collection = db.collection(collectionName);
       
            collection.insert(model, function(err, result) {
       			// model now has a value for model._id

                callback(model);
       
                db.close();
       
            });
       
        });
    
    },
    
    // get the item with the matching id
    getById: function(id, callback){
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection(collectionName);
            collection.findOne({"_id": new ObjectId(id)}, {'fileName': true, 'mimeType': true, 'size': true}, function(err, item) {
                callback(item);
            });
        });
    },
    
    // includes the binary image in the data
    getImage: function(id, callback){
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection(collectionName);
            collection.findOne({"_id": new ObjectId(id)}, {'binary': true, 'fileName': true, 'mimeType': true, 'size': true, 'encoding':true}, function(err, model) {
				
				//console.log(model.binary);
				
				
				callback(model);
				
            	/*
                var img = item.binary; 
                console.log("imageDAL.getImage item.binary = " + item.binary);
                
                //http://stackoverflow.com/questions/8110294/nodejs-base64-image-encoding-decoding-not-quite-working
                var base64Image = new Buffer(img, 'binary').toString('base64');
                var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
                callback(item, decodedImage);
                */
                
                /*
				console.log("item.binary: " + img.length)
                var buff = new Buffer(img, 'base64');
                console.log("buff.length = " + buff.length);
                callback(item, buff);
                */
                
                db.close();
            });
        });  
        
    }
    
    
    
};


module.exports = galleryDAL;
