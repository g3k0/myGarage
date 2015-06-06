angular.module('appApp')
    .controller('MainController', function ($scope, $rootScope, calls) {
        'use strict';

        //get data from db through service
        calls.getVehicles(function (data) {
            $rootScope.vehicles = data;
            //pagination directive requires $scope, can't pass through $rootScope
            $scope.total = data.length;
        });

        calls.getLevels(function (data) {
            $rootScope.levels = data;
        });

        calls.getTypes(function (data) {
            $rootScope.types = data;
        });

        //pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //get data from the sidebar and pass them to the filters
        $scope.selectedLevel = '';
        $scope.setLevel = function (level) {
            $scope.selectedLevel = level;
        };

        $scope.selectedType = '';
        $scope.setType = function (type) {
            $scope.selectedType = type;
        };
    })

    .controller('AddController', function ($scope, $rootScope, $location, calls) {
        'use strict';
        $scope.checkLicence = function (licence) {

            if (!licence) {
                alert('Please enter a valid driving licence');
                return;
            }
            var i;
            for (i = 0; i < $rootScope.total; i++) {

                if ($rootScope.vehicles[i]._id === licence) {

                    //driving licence already exist, can't go on here
                    alert('Sorry, driving lincence already signed');
                    return;
                } 
            }
            //save the licence
            $rootScope.licence = '';
            $rootScope.licence = licence;

            //ok, redirect to registration form
            $location.path("/add_form");
            return;
        };

        $scope.checkSlots = function(level, type) {

            if (!level || !type) {
                alert('Please complete the form');
                return;
            }

            //here arrives a string, convert to number
            level = parseInt(level);

            var k;
            var levelsLength = $rootScope.levels.length;
            for (k = 0; k < levelsLength; k++) { 

                //get the available slots for the selected level
                if ($rootScope.levels[k]._id === level) {
                    $rootScope.availableSlots = $rootScope.levels[k].available;
                }
            }

            //if the array is empty there are no slots available, sorry
            if ($rootScope.availableSlots.length === 0) {
                alert('Sorry, the level selected is full.\nPlease come back and select another level');
                return;
            }
            //ok, save the level
            $rootScope.selectedLevel = '';
            $rootScope.selectedType = '';
            $rootScope.selectedLevel = level;
            $rootScope.selectedType = type;

            $location.path("/slot_form");
            return;
        };

        $scope.registerVehicle = function (slot) {

            if (!slot) {
                alert('Please select a slot');
                return;
            }

            $rootScope.slot = parseInt(slot);

            //now I have all the data, I build the doc and send it to the backend       
            var doc = {
                '_id'  : $rootScope.licence,
                'type' : $rootScope.selectedType,
                'level': $rootScope.selectedLevel,
                'slot' : $rootScope.slot
            };

            calls.saveVehicle(doc, function (data) {
                //variables cleaning
                delete $rootScope.licence;
                delete $rootScope.selectedType;
                delete $rootScope.selectedLevel;
                delete $rootScope.slot;
                $location.path("/ty_page_add");
                return;
            });
        };
    })

    .controller('RemoveController', function ($scope, $rootScope, $location, calls) {
        'use strict';

        $scope.remove = function (licence) {
            var flag = 0;

            if (!licence) {
                alert('Please enter a valid driving licence');
                return;
            }

            // check if the driving licence is present
            var licObj = {};
            var j;
            for (j = 0; j < $rootScope.total; j++) {

                if ($rootScope.vehicles[j]._id === licence) {
                    //we have a licence to remove, no problem here licence is univocal
                    flag = 1;
                    licObj.lic = licence;
                    calls.removeVehicle(licObj, function (data) {
                        $location.path("/ty_page_remove");
                        return;
                    });
                } 
            }
            //driving licence not found
            if (flag === 0) {
                alert('Sorry, driving licence not found.\nNothing to remove');
                return;
            }
        };
    });