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
                //local environment: $http.get(conf.baseUri + ':' + conf.port + '/list')
                $http.get(conf.herokuUri + '/list')
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
                //local environment: $http.get(conf.baseUri + ':' + conf.port + '/levels')
                $http.get(conf.herokuUri + '/levels')
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
                //local environment: $http.get(conf.baseUri + ':' + conf.port + '/types')
                $http.get(conf.herokuUri + '/types')
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
                //local environment: $http.post(conf.baseUri + ':' + conf.port + '/save_vehicle', doc)
                $http.post(conf.herokuUri + '/save_vehicle', doc)
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
                //local environment: $http.post(conf.baseUri + ':' + conf.port + '/remove_vehicle', licence)
                $http.post(conf.herokuUri + '/remove_vehicle', licence)
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