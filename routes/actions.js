/*
* My Garage web application
* Module: routes
* File: action.js, actions definitions
*/
'use strict';

//dependencies requires
var db = require('../db.js'),
    fs = require('fs');

//actions definitions
function indexAction (req, res) {
    res.redirect('/index.html').end();
}


function listAction (req, res) {
    db.Vehicles.find(function (err, docs) {
        //don't use in production
        if (err) {
            res.send(err);
            res.end();
            return;
        }

        res.send(docs);
        res.end();
        return;
    });
}

function levelsAction (req, res) {
    db.Levels.find(function (err, docs) {
        //don't use in production
        if (err) {
            res.send(err);
            res.end();
        }

        res.send(docs);
        res.end();
        return;
    });
}

function typesAction (req, res) {
    db.Types.find(function (err, docs) {
        //don't use in production
        if (err) {
            res.send(err);
            res.end();
        }

        res.send(docs);
        res.end();
        return;
    });
}

function saveVehicleAction (req, res) {
    console.log('request for saving vehicle accepted: ' + JSON.stringify(doc));

    var doc = req.body, vehicle = new db.Vehicles(doc);

    vehicle.save(function (err) {
        if (err) {
            res.send(err);
            res.end();
            return;
        } 
        //vehicle saved, now I update level collection, I have to remove the slot
        var level = doc.level, slot = doc.slot;

        db.Levels.find({'_id': level}, function (err, levelDoc) {
            if (err) {
                res.send(err);
                res.end();
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
                    res.send(err);
                    res.end();
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
                        res.send(err);
                        res.end();
                        return;
                    }
                    console.log('documents updated correctly');
                    res.send('ok');
                    res.end();
                    return;
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
            res.send(err);
            res.end();
            return;
        } 

        var slot = doc[0].slot, level = doc[0].level;

        //now I delete the vehicle
        db.Vehicles.remove({'_id': licence}, function (err) {
            if (err) {
                res.send(err);
                res.end();
                return;
            } 

            //document deleted, now time to update slots
            db.Levels.findByIdAndUpdate(
                level,
                { $push: {'available': slot} },
                { safe: true, upsert: true },
                function (err) {
                    if (err) {
                        res.send(err);
                        res.end();
                        return;
                    }
                }
            );
            console.log('vehicle removed!');
            res.send('ok');
            res.end();
            return;
        });
    });
}

function getResourcesAction(req, res) {
    var resource = req.params.rsc; 
    
    try {
        var file = fs.readFileSync("./" + resource);
        file = JSON.parse(file);

    } catch (e) {
        res.send('resource not found');
        res.end();
        return;

    }

    res.send(file);
    res.end();
    return;
}

//actions export
exports.indexAction         = indexAction;
exports.listAction          = listAction;
exports.levelsAction        = levelsAction;
exports.typesAction         = typesAction;
exports.saveVehicleAction   = saveVehicleAction;
exports.removeVehicleAction = removeVehicleAction;
exports.getResourcesAction  = getResourcesAction;

