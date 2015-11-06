var express = require('express');



// create a route handler for requests to /test
var testRouteHandler = require(__dirname + '/routes/testRouteHandler.js')

// app is an instance of express
var app = express();



// hookup the handler to the route
app.use('/test', testRouteHandler);



// return static files from the public folder
app.use(express.static(__dirname + '/public'));




// tell the app to listen for requests on port 3000
app.listen(3000);

// hook up express app to the expport
module.exports = app;

// show that we're started
console.log("The app is up and running!");
