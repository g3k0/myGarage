var app = angular.module('appApp', [
		'ngRoute',
    'angularUtils.directives.dirPagination'
	])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainController'
      })
      .when('/add_vehicle', {
        templateUrl: 'partials/add.html',
        controller: 'AddController',
        pageTitle: 'Add a Vehicle to the Garage'
      })
      .when('/add_form', {
        templateUrl: 'partials/add_form.html',
        controller: 'AddController',
        pageTitle: 'Register your vehicle'
      })
      .when('/slot_form', {
        templateUrl: 'partials/slot_form.html',
        controller: 'AddController',
        pageTitle: 'Select a slot'
      })
       .when('/ty_page_add', {
        templateUrl: 'partials/ty_page_add.html',
        controller: 'AddController',
        pageTitle: 'Thank you page'
      })
       .when('/remove_vehicle', {
        templateUrl: 'partials/remove.html',
        controller: 'RemoveController',
        pageTitle: 'Remove a Vehicle from the Garage'
      })
      .when('/ty_page_remove', {
        templateUrl: 'partials/ty_page_remove.html',
        controller: 'RemoveController',
        pageTitle: 'Thank you page'
      })
      .otherwise({
      redirectTo: '/'
    });
  });