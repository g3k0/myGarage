//modules import
var mongoose = require('mongoose');
var fs = require('fs');

// read config file
var AppConfig = {};
var cfgFile = fs.readFileSync("./conf.json");
AppConfig = JSON.parse(cfgFile);

var connString   = AppConfig.mongoDb.connectionString;
var coll         = AppConfig.mongoDb.collections;


//establish connection
mongoose.connect(connString);
var conn = mongoose.connection;

//defining schemas
var vehiclesSchema = mongoose.Schema({
        '_id': String,
        'type': String,
        'level': Number,
        'slot': Number

    }, {collection: coll.vehicles});

var levelsSchema = mongoose.Schema({
        '_id': Number,
        'slots': Number,
        'available': Array

    }, {collection: coll.levels});

var typesSchema = mongoose.Schema({
        'type': String

    }, {collection: coll.types});



//defining Models
var Vehicles = mongoose.model('Vehicles', vehiclesSchema);
var Levels   = mongoose.model('Levels', levelsSchema);
var Types    = mongoose.model('Types', typesSchema);


//exports
exports.Vehicles = Vehicles;
exports.Levels   = Levels;
exports.Types    = Types;
