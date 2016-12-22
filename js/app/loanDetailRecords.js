/**
 * Created by gupeiling on 2016/12/22.
 */
var app=angular.module('apps');
app.controller('loanRecords',function($scope,$http){
    $http.get('./json/loanRecords.json?md='+Math.random())
        .then(function(response){
            if(response.data){
                $scope.data=response.data;
            }
        })
})