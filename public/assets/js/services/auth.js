var app = angular.module('app');

app.service('Auth',Auth);

Auth.$inject = ['$scope','$http','$window'];

 function Auth($scope, $http, $window) {

     return{
         isLogined:isLogined
     };

     function isLogined() {
         if(localStorage.token){
             return true;
         }
         return false;
     }
 }

