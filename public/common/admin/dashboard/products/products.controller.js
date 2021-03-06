var home = angular.module('home');

home.controller('ProductController', ['$scope', '$http', '$location', '$mdDialog', function($scope, $http, $location, $mdDialog) {
    $http.post('admin/products/getProducts')
        .success(function (data, status, headers, config) {
            $scope.products = data.products;
        })
        .error(function (data, status, headers, config) {

        });

    $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.showConfirm = function(ev) {
        var id = angular.element(ev.currentTarget).data('id');
        var index = angular.element(ev.currentTarget).data('index');
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('This product will be removed from the database')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $http
                .post('admin/products/delete', {id:id})
                .success(function (response) {
                    $scope.products.splice(index, 1);
                })
                .error(function (data, status, headers, config) {

                });
        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };

}]);

home.controller('ProductDetailsController', ['$scope', '$filter', '$http', '$location', '$routeParams', function($scope, $filter, $http, $location, $routeParams) {
    var url = $location.path();
    url = url.split('/');
    var id = url[url.length-1];
    $http.post('admin/products/' + id, {id:id})
        .success(function (data, status, headers, config) {
            $scope.product = data.product;
            $scope.selectedBots = data.botIds;
            $scope.date = $filter('date')(data.product.started_time, "LLLL d, yyyy HH:mm:ss", "GMT +0000");
        });

}]);