angular.module('app.controllers')

.controller('searchbarCtrl', function($scope, $http, $window) {

    $scope.debug = "debug meneh";

    $scope.searchFor = "";

    $scope.search = function() {
        if ($scope.searchFor) {
          $window.location.href = "/student/search/course/" + $scope.searchFor;
        }
    };
});
