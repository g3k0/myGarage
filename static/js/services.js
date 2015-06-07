app.factory('calls', ['$http', function ($http) {
    'use strict';

    //load config file
    var getConf = function (callback) {
        $.getJSON('conf.json', function (conf) {
            return callback(conf);
        });
    };

    return {
        getVehicles: function (callback) {

            getConf(function (conf) {
                $http.get(conf.baseUri + ':' + conf.port + '/list')
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (data, status) {
                        console.log('call to vehicles list failed with a status of ' + status);
                        return callback(status);
                    });
            });
        },

        getLevels: function (callback) {

            getConf(function (conf) {
                $http.get(conf.baseUri + ':' + conf.port + '/levels')
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (data, status) {
                        console.log('call to level failed with a status of ' + status);
                        return callback(status);
                    });
            });
        },

        getTypes: function (callback) {

            getConf(function (conf) {
                $http.get(conf.baseUri + ':' + conf.port + '/types')
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (data, status) {
                        console.log('call to vehicle types failed with a status of ' + status);
                        return callback(status);
                    });
            });
        },

        saveVehicle: function (doc, callback) {

            getConf(function (conf) {
                $http.post(conf.baseUri + ':' + conf.port + '/save_vehicle', doc)
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (data, status) {
                        console.log('vehicle saving failed with a status of ' + status);
                        return callback(status);
                    });
            });
        },

        removeVehicle: function (licence, callback) {

            getConf(function (conf) {
                $http.post(conf.baseUri + ':' + conf.port + '/remove_vehicle', licence)
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (data, status) {
                        console.log('vehicle removing failed with a status of ' + status);
                        return callback(status);
                    });
            });
        }
    };
}]);