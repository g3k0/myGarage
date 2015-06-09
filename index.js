/**
 * My Garage entry point.
 */
'use strict';

// Load dependencies
var express    = require('express'),
    bodyParser = require('body-parser'),
    fs         = require('fs');

var app = module.exports = express();

// Read config file
var AppConfig = {};
var cfgFile = fs.readFileSync("./conf.json");
AppConfig = JSON.parse(cfgFile);

// Server configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

// Routing
require('./routes')(app);

// Listening
app.listen(process.env.PORT || AppConfig.port, function(){
    console.log("Server listening on port " + AppConfig.port + ". Please open your browser at " + AppConfig.baseUri + ":" + AppConfig.port);
});