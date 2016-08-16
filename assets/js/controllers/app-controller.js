(function (angular, undefined) {
    'use strict';
    angular.module('app').controller('AppCtrl', function ($scope, $http, $window, $timeout, $log) {

    }).directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var item = angular.element('.panel');
                var login = angular.element('.login-wrap');
                $timeout(function () {
                    TweenMax.staggerTo(item, 0.3, {opacity: 1, marginTop: 0, ease: Power2.easeOut}, 0.1);
                    TweenMax.staggerTo(login, 0.3, {opacity: 1, marginTop: 200, ease: Power2.easeOut}, 0.1);

                });

            }
        }
    });
})(angular);