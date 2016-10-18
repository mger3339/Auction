var app = angular.module('app');

app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            config.headers.angular = true;

            if (localStorage.token) {
                config.headers.Authorization = 'Bearer ' + localStorage.token;
            }

            return config;
        },
        response: function (response) {
            if (response.data.status === 401) {
                delete localStorage.token;
                $window.location='/logout';
            }
            return response || $q.when(response);
        }
    };
});
