var login = angular.module('login', ['ngRoute','ngMaterial', 'ui.router']);

// login.factory('socket', function () {
//     var socket = io('http://localhost:3000');
//     return socket;
// });

login.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io('10.10.20.24:3000');

    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
                socket.removeListener(eventName, wrapper);
            };
        },

        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);

login.controller('UserController', function ($scope, $http, $window) {

    // $scope.registr = function (e) {
    //     debugger;
    //     $scope.user = {name: $scope.name, email: $scope.email, password: $scope.password};
    //     $scope.message = '';
    //     $http
    //         .post('create', $scope.user)
    //         .success(function (data, status, headers, config) {
    //             $window.location= '/login';
    //         })
    //         .error(function (data, status, headers, config) {
    //             // Erase the token if the user fails to log in
    //             delete $window.sessionStorage.token;
    //         });
    //     $scope.message = 'Error: Invalid user or password';
    // };


});

login.controller('DashboardController',['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.username = localStorage.name;
}]);

login.controller('LoginController',[ '$scope', '$http', '$window', '$state', '$rootScope', function ($scope, $http, $window, $state, $rootScope){
        $scope.login = function () {

        $scope.user = {email: $scope.email, password: $scope.password};
        $scope.message = '';
        $http
            .post('/authenticate', $scope.user)
            .success(function (data, status, headers, config) {
                if(data.token) {
                    io.Manager('10.10.20.24:3000', {autoConnect: false});
                    localStorage.token = data.token;
                    localStorage.name = data.name;

                    if(data.user == '') {
                        $state.go('user/dashboard');
                    } else {
                        $state.go(data.user + '/dashboard');
                    }
                    $rootScope.$broadcast('onLogin', data.user)
                }
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete localStorage.token;
            });
        $scope.message = 'Error: Invalid user or password';
    };
}]);

login.controller('RegisterController', function ($scope, $http, $window, socket){
    $scope.register = function (e) {
        $scope.user = {name: $scope.name, email: $scope.email, password: $scope.password};
        $scope.message = '';
        $http
            .post('create', $scope.user)
            .success(function (data, status, headers, config) {
                $state.go('/login');
                // $window.location= '/login';
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete localStorage.token;
            });
        $scope.message = 'Error: Invalid user or password';
    };
});

login.controller('LogoutController', function ($scope, $http, $window){
    $scope.logOut = function () {
        delete localStorage.token;
        $window.location = '/logout';
        $scope.auth = false;
    }


});