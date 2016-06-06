angular.module('app.controllers')

.controller('requestsTeaCtrl', function($scope, $http, $window) {


    $scope.requests = [];
    $scope.message = null;

    $scope.initializeRequests = function(requests) {
        $scope.requests = JSON.parse(requests);
        console.log($scope.requests);
    };

    //Accept Request
    $scope.acceptRequest = function(request) {
      $scope.message = null;
      console.log("accept");
      $http({
          method: 'PUT',
          url: '/requests/accept/' + request._id,
          data: {
          request: request
          }
      }).then(function successCallback(response) {
          $scope.requests.splice(request, 1);
          $scope.message = request.student.firstName + " " + request.student.lastName + " ha sido agregado al curso " + request.course.name;



          // this callback will be called asynchronously
          // when the response is available
      }, function errorCallback(response) {
          $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });

    };

    //Delete Request
    $scope.rejectRequest = function(request) {
      $scope.message = null;
      $http({
          method: 'PUT',
          url: '/requests/reject/' + request._id,
          data: {
          request: request
          }
      }).then(function successCallback(response) {
          $scope.requests.splice(request, 1);
          $scope.message = request.student.firstName + " " + request.student.lastName + "no ha sido agregado al curso " + request.course.name;



          // this callback will be called asynchronously
          // when the response is available
      }, function errorCallback(response) {
          $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
    };

});
