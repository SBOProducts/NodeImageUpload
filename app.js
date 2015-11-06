var express = require('express');
var app = express();

app.listen(3000);

app.get('/', function(req, res){
  res.send('hello world');
});

module.exports = app;

console.log("The app is up and running!");