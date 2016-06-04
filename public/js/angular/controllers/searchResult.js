angular.module('app.controllers')

.controller('searchResultCtrl', function($scope, $http, $window) {


    $scope.courses = [];

    $scope.initialize = function(courses) {
        $scope.courses = JSON.parse(courses);
    };

    $scope.isSignedUp = function(user, course) {
        _user = JSON.parse(user);
        for (var i = 0; i < _user.courses.length; i++) {
            if (_user.courses[i] == course._id)
                return true;
        }
        return false;
    };

    $scope.isPendingRequest = function(user,course) {
      return false;
    };

    //Method when the "inscribirme" button is pressed. It sends a courseRequest so afterwards the teacher can accept the student
    $scope.sendRequest = function(user, course) {

    };
});
