var app = angular.module('app');

app.config(function ($interpolateProvider, $httpProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $httpProvider.interceptors.push('authInterceptor');
});
