var bid = angular.module('user');
bid.controller('UserBidController', ['$scope', '$filter', '$http', '$location', '$routeParams', '$rootScope', 'socket', '$window', function($scope, $filter, $http, $location, $routeParams, $rootScope, socket, $window) {

    $scope.makeBid = function (ev) {
        var id = angular.element(ev.currentTarget).data('id');
        socket.emit('makeBid', {
            userToken: localStorage.token,
            id : id
        });
    }
}]);
