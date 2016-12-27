var app=angular.module('apps');
app.controller('insuranceCtrl',function($scope,$http){
    $http.get('./json/insurance.json?md='+Math.random())
        .then(function(response){
            $scope.data = response.data.data;
            var showOne = $scope.data[0].ctag;
            for(var i = 0;i<$scope.data.length-1;i++){
                if(showOne == $scope.data[i+1].ctag){
                    $scope.data[i].ctag = $scope.data[i+1].ctag;
                    $scope.data[i+1].ctag = '';
                }else{
                    showOne = $scope.data[i+1].ctag;
                }
            }
        },function(response){

        })
})