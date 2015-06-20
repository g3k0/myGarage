/*
* My Garage web application
* Module: routes
* File: index.js, module entry point, routes mapping
*/
'use strict';

//dependencies require
var actions = require('./actions');

module.exports = function (app) {

    // Single page Angular application route
    app.get('/', actions.indexAction);

    // get all vehicles
    app.get('/list', actions.listAction);

    //get levels and available slots
    app.get('/levels', actions.levelsAction);

    //get vehicle types
    app.get('/types', actions.typesAction);

    //save new vehicle
    app.post('/save_vehicle', actions.saveVehicleAction);

    //remove a vehicle
    app.post('/remove_vehicle', actions.removeVehicleAction);

    //get internal resources (should be JSON objects)
    app.get('/:rsc', actions.getResourcesAction);
};