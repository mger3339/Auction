var bot = angular.module('bot');

bot.controller('BotController', ['$scope', '$http', '$location', '$mdDialog', function($scope, $http, $location, $mdDialog) {
    $http.post('admin/bots/getBots')
        .success(function (data, status, headers, config) {
            $scope.bots = data.bots;
        })
        .error(function (data, status, headers, config) {

        });

    // $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.showConfirm = function(ev) {
        var id = angular.element(ev.currentTarget).data('id');
        var index = angular.element(ev.currentTarget).data('index');
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('This Bot will be removed from the database')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $http
                .post('admin/bots/delete', {id:id})
                .success(function (response) {
                    $scope.bots.splice(index, 1);
                })
                .error(function (data, status, headers, config) {

                });
        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };

}]);

bot.controller('BotDetailsController', ['$scope', '$http', '$state', '$filter', '$location', function($scope, $http, $state, $filter, $location) {
    var url = $location.path();
    url = url.split('/');
    var id = url[url.length-1];
    $http.post('admin/bots/' + id, {id:id})
        .success(function (data, status, headers, config) {
            $scope.bot = data.bot;
        });
}]);

bot.controller('SelectBotsController',['$scope', '$element', '$http', '$rootScope', function($scope, $element, $http, $rootScope) {
    $http.post('admin/bots/getBots')
        .success(function (data) {
            $scope.bots = data.bots;
        });
    $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
    };
    $element.find('input').on('keydown', function(ev) {
        ev.stopPropagation();
    });
    $scope.selectChanged = function() {
        $rootScope.$broadcast('selectBot', $scope.selectedBots);
    };
}]);