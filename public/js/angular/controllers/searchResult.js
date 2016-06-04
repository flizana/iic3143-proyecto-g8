angular.module('app.controllers')

.controller('searchResultCtrl', function($scope, $http, $window) {


    $scope.courses_searched = [];

    $scope.initialize = function(courses) {
        $scope.courses_searched = JSON.parse(courses);
    };

    $scope.isSignedUp = function(user, course) {
        _user = JSON.parse(user);
        for (var i = 0; i < _user.courses.length; i++) {
            if (_user.courses[i] == course._id)
                return true;
        }
        return false;
    };

    $scope.isPendingRequest = function(user, course) {
        console.log("PENDING");
        console.log(course._id);
        course.pendingRequest = false;
        _user = JSON.parse(user);
        $http({
            method: 'GET',
            url: '/student/courses/' + course._id + '/request/find'
        }).then(function successCallback(response) {
            console.log("http ok");
            console.log(response);
            if (response.data.request.length > 0)
                course.pendingRequest = true;



            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            console.log("http not ok");
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        return false;
    };

    //Method when the "inscribirme" button is pressed. It sends a courseRequest so afterwards the teacher can accept the student
    $scope.sendRequest = function(user, course) {
        console.log("createRequest");
        _user = JSON.parse(user);
        $http({
            method: 'POST',
            url: '/student/courses/' + course._id + '/request/create',
            data: {
                user: _user,
                course: course
            }
        }).then(function successCallback(response) {
            console.log("http ok");
            console.log(response);
            course.pendingRequest = true;



            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            console.log("http not ok");
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
});
