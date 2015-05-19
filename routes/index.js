var db = require('../db.js');

module.exports = function(app){

	// Single page Angular application route
	app.get('/', function (req,res){
	                 res.redirect('/index.html');
	                 res.end();
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
};




//actions definitions
function listAction(req,res) {
	db.Vehicles.find(function(err,docs){
		//don't use in production
		if (err) {
			res.send(err);
			res.end();
		}

		res.send(docs);
		res.end();
	});
}

function levelsAction(req,res) {
	db.Levels.find(function(err,docs){
		//don't use in production
		if (err) {
			res.send(err);
			res.end();
		}

		res.send(docs);
		res.end();
	});
}

function typesAction(req,res) {
	db.Types.find(function(err,docs){
		//don't use in production
		if (err) {
			res.send(err);
			res.end();
		}

		res.send(docs);
		res.end();
	});
}

function saveVehicleAction(req,res) {
	var doc = req.body;
	console.log('request for saving vehicle accepted: ' + JSON.stringify(doc));


	var vehicle = new db.Vehicles(doc);

	vehicle.save(function(err){
		if(err) {
			res.send(err);
			res.end();
			return;
		} else {
			//vehicle saved, now I update level collection, I have to remove the slot
			var level = doc.level;
			var slot = doc.slot;

			db.Levels.find({_id: level}, function (err, levelDoc) {
				if(err) {
					res.send(err);
					res.end();
					return;
				} else {
					var newSlots = levelDoc[0].available;
					
					//remove the slot 
					var index = newSlots.indexOf(slot);
					if (index > -1) {
					    newSlots.splice(index, 1);
					}

					//here there is a bug in mongoose, when you try to update 
					//an array field with less elements, it saves the array
					//with the elements deleted: workaround, first I delete the doc
					//then I insert the new one again

					db.Levels.remove({ _id: levelDoc[0].id }, function(err) {
					    if (err) {
					            res.send(err);
								res.end();
								return;
					    } else {
					    	var newDoc = {
								_id      : levelDoc[0].id,
								slots    : levelDoc[0].slots,
								available: newSlots
							};

							var newLevel = new db.Levels(newDoc); 

							//update levels
							newLevel.save(function(err){
								if(err) {
									res.send(err);
									res.end();
									return;
								} else { 
									console.log('documents updated correctly');
									res.send('ok');
									res.end();
								}
							});
					            
					    }
					});
				}
			});
		}
	});
}

function removeVehicleAction (req, res) {
	var licence = req.body.lic;
	console.log('request for removing vehicle accepted: ' + licence);

	//first I find the corresponding level and slot
	db.Vehicles.find({_id:licence}, function (err, doc){
		if (err) {
			res.send(err);
			res.end();
			return;
		} else {
			var slot = doc[0].slot;
			var level = doc[0].level;
			//now I delete the vehicle
			db.Vehicles.remove({_id: licence}, function(err) {
			    if (err) {
			            res.send(err);
						res.end();
						return;
			    } else {
			    	//document deleted, now time to update slots
			    	db.Levels.findByIdAndUpdate(
					    level,
					    {$push: {available: slot}},
					    {safe: true, upsert: true},
					    function(err) {
					        if(err){
					        	res.send(err);
					        	res.end();
					        }
					    }
					);
					console.log('vehicle removed!');
					res.send('ok');
					res.end();
			    }
			});
		}
	});
}