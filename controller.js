var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $http.get("http://ubuntu:8080/")
  .then(function(response) {
      //$scope.myWelcome = response.data;
	  $scope.contacts = response.data;
  });
  
  $scope.deleteRecord=function(id) {
	  
  //$http.get("http://ubuntu:8080/delete", {'dat':'dat1'});
	  
  $http({
	  method: 'GET',
	  url: 'http://ubuntu:8080/delete?id='+id,
	data: {'message':'message'}
  });
  //$http.post("http://ubuntu:8080/");
  };
});