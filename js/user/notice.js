/**
 * Created by gupeiling on 2017/1/4.
 */
var app = angular.module('apps');
app.controller('noticeController',function($scope,$stateParams,$location,$http,$log){
    $scope.changeType = function(x){
        // $location.search('type',x);修改url参数
        $scope.hl = x || 'intro';
    }
    $scope.changeType($stateParams.type);
    $http.get('./json/notice-ques.json')
        .then(function(response){
            $scope.results = response.data.results;
        })
})