var app=angular.module('apps');
app.controller('myWealthCtrl',function($scope,$http,$state,analyticsInfo,$timeout,ipCookie){
  $scope.downloadStatus = localStorage.getItem('downloadStatus');
})
