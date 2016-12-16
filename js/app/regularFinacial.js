var app=angular.module('apps');
app.controller('regularCtrl',function($scope,$http){
    $http.get('../json/regular.json')
        .then(function(response){
            $scope.list=response.data;
            // console.log(response.data)
        },function(response){
            console.log('error');
        })
})