var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nodeImageUpload';
var collectionName = 'Images';


var galleryDAL = {
    
    // creates a new item
    create: function(model, imageData, callback){
        
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection(collectionName);
            
            model.binary = new mongo.Binary(imageData);
            
            collection.insert(model, function(err, result) {
                callback(result);
                db.close();
            });
        });

    },
    
    // get the item with the matching id
    getById: function(id, callback){
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection(collectionName);
            collection.findOne({"_id": new ObjectId(id)}, {'binary': true, 'fileName': true, 'mimeType': true, 'size': true}, function(err, item) {
                callback(item);
            });
        });
    },
    
    // includes the binary image in the data
    getImage: function(id, callback){
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection(collectionName);
            collection.findOne({"_id": new ObjectId(id)}, {'binary': true, 'fileName': true, 'mimeType': true, 'size': true, 'encoding':true}, function(err, item) {

                if(item)
                {
                    var img = item.binary;
                    var buff = new Buffer(img, item.encoding); // 'binary');
                    callback(item, buff);
                } else {
                    callback(null);
                }
                
                db.close();
            });
        });  
        
    }
    
    
    
};


module.exports = galleryDAL;
