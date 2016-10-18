var user = angular.module('user');

user.controller('UserProductController', ['$scope', '$http', '$location', '$mdDialog', function($scope, $http, $location, $mdDialog) {
    $http
        .post('user/products/getProducts')
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

user.controller('UserProductDetailsController', ['$scope', '$filter', '$http', '$location', '$routeParams', '$rootScope', 'socket', '$window', function($scope, $filter, $http, $location, $routeParams, $rootScope, socket, $window) {
    var url = $location.path();
    url = url.split('/');
    var id = url[url.length-1];
    $http.post('/user/products/' + id, {id:id})
        .success(function (data, status, headers, config ) {
            $scope.product = data.product;
            $scope.date = $filter('date')(data.product.started_time, "LLLL d, yyyy HH:mm:ss", "GMT +0000");
            if(data.product.status == 'started') {
                $scope.auction = data.status;
            } else if(data.product.status == 'closed'){
                $scope.status = data.product.status;
                $scope.bidUser = data.bidUser;
                $scope.auction = '';

            }

            socket.emit('productViewer', {
                userToken: localStorage.token,
                id : data.product.id
            });

            // if(sessionStorage.listener === undefined) {
            //     sessionStorage.listener = 1;
                socket.on('dataBids', function (bids) {
                    $scope.bids = bids;
                });

                socket.on('auctionStart', function (data) {
                    console.log(data.status);
                    if(data.status == 'started') {
                        $scope.auction = data.status;
                    }
                });
                socket.on('auctionTimer', function (dataTimer) {
                    if(dataTimer.id == data.product.id) {
                        $scope.data = dataTimer;
                    }
                });
                socket.on('auctionBid', function (dataBid) {
                    if(dataBid.id == data.product.id) {
                        $scope.bids.unshift(dataBid);
                        $scope.product.started_price = dataBid.price;
                    }
                });

                socket.on('auctionClosed', function (dataClosed) {
                    if(dataClosed.id == data.product.id) {
                        $scope.bidUser = dataClosed.bidUser;
                        $scope.status = dataClosed.status;
                        $scope.auction = '';
                    }
                });
            // }
        });
}]);
