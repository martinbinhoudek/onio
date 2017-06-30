var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $window) {
  $http.get("http://ubuntu:8080/")
  .then(function(response) {
      //$scope.myWelcome = response.data;
	  $scope.contacts = response.data;
  });
  $scope.editId='';
  $scope.editInsert='Insert a new record:';
  
  
  /**
  * Sends http request to http server with id for deletion and then reloads the page
  * Request is sent to /delete?id=ID_TO_BE_DELETED
  * @param obj event Event containing id to be deleted
  **/
  $scope.deleteRecord=function(event) {  
    $http({
	  method: 'GET',
	  url: 'http://ubuntu:8080/delete?id='+event.target.id
    });
    $window.location.reload();
  };
  
  /**
  * Sends http request to http server and then reloads the page
  * It either saves new value (id is empty) or edits the old one (id has value)
  * Request is sent to /save?NEW_VALUES_STRING for saving
  * or to /edit?id=ID_TO_BE_CHANGED&NEW_VALUES_STRING
  **/
  $scope.saveRecord=function() {
    if ($scope.editId=='') {
      $http({
	  method: 'POST',
      url: 'http://ubuntu:8080/?name='+$scope.name+'&surname='+$scope.surname+'&email='+$scope.email+'&phone='+$scope.phone+'&address='+$scope.address
      });
    }
    else {
      $http({
	  method: 'GET',
      url: 'http://ubuntu:8080/edit?id='+$scope.editId+'&name='+$scope.name+'&surname='+$scope.surname+'&email='+$scope.email+'&phone='+$scope.phone+'&address='+$scope.address
      });
    }
    $window.location.reload();
  };
  
  /**
  * Prepares record for editing.
  * It sets old values to the form, changes heading of the form and stores record ID for editing
  * @param obj event Event containingid to be changed
  **/
  $scope.editPrepare=function (event) {
	$scope.editId=event.target.id;
	pom=JSON.parse(event.target.getAttribute('data'));
	$scope.name=pom.name;
	$scope.surname=pom.surname;
	$scope.email=pom.email;
	$scope.phone=pom.phone;
	$scope.address=pom.address;
	$scope.editInsert="Editing "+pom.name+" "+pom.surname+":";
  };
});