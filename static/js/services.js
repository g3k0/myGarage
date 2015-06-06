app.factory('calls', ['$rootScope', '$http', function ($rootScope, $http) {
    'use strict';

    return {
        getVehicles: function (callback) {
            $http.get('http://localhost:3000/list').success(function (data) {
                return callback(data);
            });

        },
        getLevels: function (callback) {
            $http.get('http://localhost:3000/levels').success(function (data) {
                return callback(data);
            });

        },
        getTypes: function (callback) {
            $http.get('http://localhost:3000/types').success(function (data) {
                return callback(data);
            });
        },
        saveVehicle: function (doc, callback) {
            $http.post('http://localhost:3000/save_vehicle', doc).success(function (data) {
                return callback(data);
            });
        },
        removeVehicle: function (licence, callback) {
            $http.post('http://localhost:3000/remove_vehicle', licence).success(function (data) {
                return callback(data);
            });
        }
    };
}]);