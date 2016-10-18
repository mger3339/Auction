var user = angular.module('user');

user.config(['$routeProvider', '$locationProvider', '$stateProvider', function ($routeProvider, $locationProvider, $stateProvider) {
    $locationProvider.html5Mode({
        enabled : true,
        requireBase : false
    });

    $routeProvider
        .when('/dashboard', {
            templateUrl: 'assets/templates/user/home.html',
            controller: 'UserHomeController'
        })
        .when('/products', {
            templateUrl: 'assets/templates/user/products.html',
            controller: 'UserProductController'
        })
        .when('/products/:productId', {
            templateUrl: 'assets/templates/user/product-details.html',
            controller: 'UserProductDetailsController'
        });
    // .otherwise({
    //     redirectTo: '/logout'
    // });
}]);