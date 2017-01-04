var app=angular.module('apps');
app.controller('insuranceCtrl',function($scope,$http,analyticsInfo){
    $http.get('./json/insurance.json?md='+Math.random())
        .then(function(response){
            $scope.data = response.data.data;
            $scope.data[0].isHideTag = false;
            for(var i = 0;i<$scope.data.length;i++){//添加字段，只显示一个tag
                for(var j = 0;j<$scope.data.length-i-1;j++){
                    if($scope.data[j].ctag == $scope.data[j+1].ctag){
                        $scope.data[j+1].isHideTag = true;
                    }
                }
            }
        },function(response){

        })
    $scope.analyticsInfo = analyticsInfo;
})