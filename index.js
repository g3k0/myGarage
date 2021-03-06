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
try {
    AppConfig = JSON.parse(cfgFile);
} catch (e) {
    console.log('something went wrong in parsing config file, error: ' + e);
}

// Server configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

// Routing
require('./routes')(app);

// Listening
var port = process.env.PORT || AppConfig.port;
app.listen(port, function () {
    console.log("Server listening on port " + port + ". Please open your browser at " + AppConfig.baseUri + ":" + port);
});