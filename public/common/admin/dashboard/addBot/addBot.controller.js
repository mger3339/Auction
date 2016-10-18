var bot = angular.module('bot', ['ngRoute', 'ngMaterial', 'ui.router']);

bot.controller('BotCreateController', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {
    $scope.addBot = function () {

        $http.post('admin/bots/addBot', {name: $scope.botName}, {
            // withCredentials: true,
            // headers: {'Content-Type': undefined },
            // transformRequest: angular.identity
        }).success(function (data, status, headers, config) {
            if(data[0] == 'success') {
                $state.go('updateBot');
            }
        })
    }
}]);

bot.controller('BotEditController', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {
    $scope.updateBot = function (ev) {
        var id = angular.element(ev.currentTarget).data('id');

        $http.post('admin/bots/update', {name: $scope.bot.name, id: id}, {
            // withCredentials: true,
            // headers: {'Content-Type': undefined },
            // transformRequest: angular.identity
        }).success(function (data, status, headers, config) {
            $scope.status = data[0];
            $state.go('updateBot');
        })
    }
}]);