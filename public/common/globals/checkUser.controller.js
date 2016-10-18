var app = angular.module('app');

app.controller('checkUserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    if(localStorage.token) {
        $scope.username = localStorage.name;
        $http
            .post('getUser')
            .success(function (data) {
                $scope.user = data;
                io.Manager('10.10.20.24:3000', {autoConnect: false});
            })
            .error(function (data) {

            });
    }
}]);