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
      console.log("pendign");
      return false;
    };

    //Method when the "inscribirme" button is pressed. It sends a courseRequest so afterwards the teacher can accept the student
    $scope.sendRequest = function(user, course) {
      console.log("createRequest");
      _user = JSON.parse(user);
      $http({
          method: 'POST',
          url: '/student/courses/' + course._id +'/request/create',
          data: {
            user: _user,
            course: course
          }
      }).then(function successCallback(response) {
        console.log("http ok");
        console.log(response);



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
