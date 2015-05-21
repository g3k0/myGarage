/**
 * Module dependencies.
 */
'use strict';
var express    = require('express'),
    bodyParser = require('body-parser');

var app = module.exports = express();

// Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

// Routing
require('./routes')(app);

// Listening
app.listen(3000, function(){
    console.log("Server listening on port 3000. Please open your browser at http://localhost:3000");
});