(function (angular, undefined) {
    'use strict';
    angular.module('app', ['ngRoute']).config(function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: "views/index.ejs",
                controller: 'AppCtrl'
            })
            .when('/index', {
                templateUrl: "views/index.ejs",
                controller: 'AppCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(angular);