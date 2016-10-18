var home = angular.module('home');

home.controller('ProductCreateController', ['$scope', '$http', '$state', '$filter', '$rootScope', function($scope, $http, $state, $filter, $rootScope) {
    $scope.hideInfo = true;

    $rootScope.$on('selectBot',function ($event, selectedBots) {
        $scope.selectHidden = selectedBots;
    });
    $scope.addProduct = function (files) {

        var dateTime = $filter('date')($scope.dateTime, "yyyy-MM-dd HH:mm:ss");
        var formData = new FormData(angular.element("#create-product-form"));

        formData.append("name", $scope.name);
        formData.append("description", $scope.description);
        formData.append("startPrice", $scope.startPrice);
        formData.append("realPrice", $scope.realPrice);
        formData.append("startTime", dateTime);
        formData.append("imgName", files.name);
        formData.append("bots", $scope.selectHidden);
        formData.append("file", files);

        $http.post('admin/products/add', formData, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function (data, status, headers, config) {
            $scope.hideInfo = false;
            $scope.status = data[0];
            $state.go('update');
        })
    }
}]);

home.controller('ProductEditController', ['$scope', '$http', '$state', '$filter', '$rootScope', function($scope, $http, $state, $filter, $rootScope) {
    $scope.hideInfo = true;
    $rootScope.$on('selectBot',function ($event, selectedBots) {
        $scope.selectHidden = selectedBots;
    });
    $scope.updateProduct = function (files) {
        var dateTime = $filter('date')($scope.product.started_time, "yyyy-MM-dd HH:mm:ss");
        var formData = new FormData(angular.element("#edit-product-form"));
        formData.append("name", $scope.product.name);
        formData.append("description", $scope.product.description);
        formData.append("startPrice", $scope.product.started_price);
        formData.append("realPrice", $scope.product.real_price);
        formData.append("startTime", dateTime);
        formData.append("bots", $scope.selectHidden);
        formData.append("id", $scope.product.id);
        if(files) {
            formData.append("imgName", files.name);
            formData.append("file", files);
        } else {
            formData.append("imgName", '');
            formData.append("file", '');
        }

        $http.post('admin/products/update', formData, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function (data, status, headers, config) {
            $scope.hideInfo = false;
            $scope.status = data[0];
            $state.go('update');
        })
    }
}]);