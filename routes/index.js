'use strict';

var db = require('../db.js'),
    fs = require('fs');

//actions definitions
function listAction (req, res) {
    db.Vehicles.find(function (err, docs) {
        //don't use in production
        if (err) {
            res.send(err);
            res.end();
        }

        res.send(docs).end();
    });
}

function levelsAction (req, res) {
    db.Levels.find(function (err, docs) {
        //don't use in production
        if (err) {
            res.send(err);
            res.end();
        }

        res.send(docs).end();
    });
}

function typesAction (req, res) {
    db.Types.find(function (err, docs) {
        //don't use in production
        if (err) {
            res.send(err);
            res.end();
        }

        res.send(docs).end();
    });
}

function saveVehicleAction (req, res) {
    console.log('request for saving vehicle accepted: ' + JSON.stringify(doc));

    var doc = req.body, vehicle = new db.Vehicles(doc);

    vehicle.save(function (err) {
        if (err) {
            res.send(err).end();
            return;
        } 
        //vehicle saved, now I update level collection, I have to remove the slot
        var level = doc.level, slot = doc.slot;

        db.Levels.find({'_id': level}, function (err, levelDoc) {
            if (err) {
                res.send(err).end();
                return;
            }

            var newSlots = levelDoc[0].available, index = newSlots.indexOf(slot);

            //remove the slot
            if (index > -1) {
                newSlots.splice(index, 1);
            }

            //here there is a bug in mongoose, when you try to update 
            //an array field with less elements, it saves the array
            //with the elements deleted: workaround, first I delete the doc
            //then I insert the new one again

            db.Levels.remove({ '_id': levelDoc[0].id }, function (err) {
                if (err) {
                    res.send(err).end();
                    return;
                } 
     
                var newDoc = {
                    '_id'      : levelDoc[0].id,
                    'slots'    : levelDoc[0].slots,
                    'available': newSlots
                }, newLevel = new db.Levels(newDoc); 

                //update levels
                newLevel.save(function (err) {
                    if (err) {
                        res.send(err).end();
                        return;
                    }
                    console.log('documents updated correctly');
                    res.send('ok').end();
                });
            });
        });
    });
}

function removeVehicleAction(req, res) {
    var licence = req.body.lic;
    console.log('request for removing vehicle accepted: ' + licence);

    //first I find the corresponding level and slot
    db.Vehicles.find({'_id': licence}, function (err, doc) {
        if (err) {
            res.send(err).end();
            return;
        } 

        var slot = doc[0].slot, level = doc[0].level;

        //now I delete the vehicle
        db.Vehicles.remove({'_id': licence}, function (err) {
            if (err) {
                res.send(err).end();
                return;
            } 

            //document deleted, now time to update slots
            db.Levels.findByIdAndUpdate(
                level,
                { $push: {'available': slot} },
                { safe: true, upsert: true },
                function (err) {
                    if (err) {
                        res.send(err).end();
                    }
                }
            );
            console.log('vehicle removed!');
            res.send('ok').end();
        });
    });
}

function getResourcesAction(req, res) {
    var resource = req.params.rsc; 
    
    try {
        var file = fs.readFileSync("./" + resource);
        file = JSON.parse(file);

    } catch (e) {
        console.log('there was an error in parsing the resource requested: ' + e);
        res.send('resource not found').end();

    }

    res.send(file).end();
}

module.exports = function (app) {

    // Single page Angular application route
    app.get('/', function (req, res) {
        res.redirect('/index.html').end();
    });

    // get all vehicles
    app.get('/list', listAction);

    //get levels and available slots
    app.get('/levels', levelsAction);

    //get vehicle types
    app.get('/types', typesAction);

    //save new vehicle
    app.post('/save_vehicle', saveVehicleAction);

    //remove a vehicle
    app.post('/remove_vehicle', removeVehicleAction);

    //get internal resources (should be JSON objects)
    app.get('/:rsc', getResourcesAction);
};