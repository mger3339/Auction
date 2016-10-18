var home = angular.module('home');

home.config(['$routeProvider', '$locationProvider', '$stateProvider', function ($routeProvider, $locationProvider, $stateProvider) {
    $locationProvider.html5Mode({
        enabled : true,
        requireBase : false
    });

    $stateProvider
        .state('update', {
            url: '/admin/products',
            templateUrl: 'assets/templates/admin/products.html',
            controller: 'ProductEditController'
        });
    $stateProvider
        .state('updateBot', {
            url: '/admin/bots',
            templateUrl: 'assets/templates/admin/bot/bots.html',
            controller: 'BotEditController'
        });

    $routeProvider
        .when('/admin/dashboard', {
            templateUrl: 'assets/templates/admin/home.html',
            controller: 'HomeController'
        })
        .when('/admin/products', {
            templateUrl: 'assets/templates/admin/products.html',
            controller: 'ProductController'
        })
        .when('/admin/bots', {
            templateUrl: 'assets/templates/admin/bot/bots.html',
            controller: 'BotController'
        })
        .when('/admin/add', {
            templateUrl: 'assets/templates/admin/product-create.html',
            controller: 'ProductCreateController'
        })
        .when('/admin/addBot', {
            templateUrl: 'assets/templates/admin/bot/bot-create.html',
            controller: 'BotCreateController'
        })
        .when('/admin/products/:productId', {
            templateUrl: 'assets/templates/admin/product-details.html',
            controller: 'ProductDetailsController'
        })
        .when('/admin/bots/edit/:botId', {
            templateUrl: 'assets/templates/admin/bot/bot-edit.html',
            controller: 'BotEditController'
        })
        .when('/admin/products/edit/:productId', {
            templateUrl: 'assets/templates/admin/product-edit.html',
            controller: 'ProductEditController'
        })
        .otherwise({
            redirectTo: '/logout'
        });
}]);