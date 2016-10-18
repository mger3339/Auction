(function () {
    angular.module('timer', []).directive('countdown', [
        'Util',
        '$interval','$timeout',
        function (Util, $interval, $timeout) {
            return {
                restrict: 'A',
                scope: { date: '@' },
                link: function (scope, element) {
                    $timeout(function () {
                        var id = angular.element(element).data('id');
                        var future;
                        future = new Date(scope.date);
                        var intv = $interval(function () {
                            var diff;
                            diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                            return element.text(Util.dhms(diff, intv, id));
                        }, 1000);
                    }, 1000);

                }
            };
        }
    ]).factory('Util', ['$interval', '$http',function ($interval, $http) {
        return {
            dhms: function (t, intv, id) {
                var days, hours, minutes, seconds;
                days = Math.floor(t / 86400);
                t -= days * 86400;
                hours = Math.floor(t / 3600) % 24;
                t -= hours * 3600;
                minutes = Math.floor(t / 60) % 60;
                t -= minutes * 60;
                seconds = t % 60;
                if(days == 0 && hours == 0 && minutes == 0 && seconds == 0 || days < 0) {
                    $interval.cancel(intv);
                    // $http
                    //     .post('products/updateStatus', {id:id, status: 'closed'})
                    //     .success(function (data) {
                    //
                    //     });
                    return "CLOSED";
                } else {
                    return [
                        days + 'day',
                        hours + 'hours',
                        minutes + 'min',
                        seconds + 'sec'
                    ].join(' ');
                }
            }
        };
    }]);
}.call(this));