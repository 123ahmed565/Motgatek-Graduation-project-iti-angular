var app = angular.module('App', []);

app.controller('Ctrl1', function($scope) {
  
  $scope.ngIfTester = true;
  $scope.view = { modelText: 'change me' };

});