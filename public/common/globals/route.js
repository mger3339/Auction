var app = angular.module('app');

app.config(['$routeProvider', '$locationProvider', '$stateProvider', function ($routeProvider, $locationProvider, $stateProvider) {
    $locationProvider.html5Mode({
        enabled : true,
        requireBase : false
    });

    $stateProvider
        .state('admin/dashboard', {
            url: '/admin/dashboard',
            templateUrl: 'assets/templates/admin/home.html',
            controller: 'DashboardController'
        });

    $stateProvider
        .state('user/dashboard', {
            url: '/dashboard',
            templateUrl: 'assets/templates/user/home.html',
            controller: 'DashboardController'
        });

    $stateProvider
        .state('/login', {
            url: '/login',
            templateUrl: 'assets/templates/auth/login.html',
            controller: 'DashboardController'
        });


    $routeProvider
        .when('/login', {
            templateUrl: 'assets/templates/auth/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'assets/templates/auth/register.html',
            controller: 'RegisterController'
        });
}]);



