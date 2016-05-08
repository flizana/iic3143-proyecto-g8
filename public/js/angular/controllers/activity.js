// public/js/angular/controllers/activity.js

//add controller activityCtrl to the module of controllers
angular.module('app.controllers', [])

.controller('activityCtrl', function($scope) {
    $scope.firstName = "";
    $scope.lastName = "Doe";
    $scope.color = "red";
});
