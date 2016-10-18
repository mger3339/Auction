var app = angular.module('app');

app.controller('AuthController',[ '$scope', '$http', '$window','$rootScope', function ($scope, $http, $window, $rootScope) {
    if(!localStorage.token) {
        $scope.auth = false;
    } else {
        $scope.auth = true;
    }

    $rootScope.$on('onLogin',function ($event, user) {
        $scope.user = user;
        $scope.auth = $scope.isLogined();
    });

    $scope.isLogined = function () {
        if(!localStorage.token) {
            return false;
        } else {
            return true;
        }
    };
}]);