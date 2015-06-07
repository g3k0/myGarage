app.factory('calls', ['$http', function ($http) {
    'use strict';

    return {
        getVehicles: function (callback) {
            $http.get('http://localhost:3000/list')
                .success(function (data) {
                    return callback(data);
                })
                .error(function (data, status) {
                    console.log('call to vehicles list failed with a status of ' + status);
                    return callback(status);
                });

        },

        getLevels: function (callback) {
            $http.get('http://localhost:3000/levels')
                .success(function (data) {
                    return callback(data);
                })
                .error(function (data, status) {
                    console.log('call to level failed with a status of ' + status);
                    return callback(status);
                });

        },

        getTypes: function (callback) {
            $http.get('http://localhost:3000/types')
                .success(function (data) {
                    return callback(data);
                })
                .error(function (data, status) {
                    console.log('call to vehicle types failed with a status of ' + status);
                    return callback(status);
                });
        },

        saveVehicle: function (doc, callback) {
            $http.post('http://localhost:3000/save_vehicle', doc)
                .success(function (data) {
                    return callback(data);
                })
                .error(function (data, status) {
                    console.log('vehicle saving failed with a status of ' + status);
                    return callback(status);
                });
        },

        removeVehicle: function (licence, callback) {
            $http.post('http://localhost:3000/remove_vehicle', licence)
                .success(function (data) {
                    return callback(data);
                })
                .error(function (data, status) {
                    console.log('vehicle removing failed with a status of ' + status);
                    return callback(status);
                });
        }
    };
}]);