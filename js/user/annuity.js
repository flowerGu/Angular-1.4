/**
 * Created by gupeiling on 2016/12/30.
 */
var app = angular.module('apps');
app.controller('annuity',function($scope,$http,analyticsInfo){
    $scope.noticeLocation = [
        {types:'intro',name:'产品介绍'},
        {types:'notice',name:'购买须知'},
        {types:'pro',name:'常见问题'}
    ]
    $http.get('./json/annuity.json?md='+Math.random())
        .then(function(response){
            if(response.data.data){
                $scope.data = response.data.data;
                angular.element(document.getElementsByClassName('readme')[0]).html('<span>'+$scope.data.insFeature+'</span>')
                $scope.user = {
                    name:$scope.data.fengInsName,
                    subName:'注册'
                }
            }
        })
    $scope.analyticsInfo = analyticsInfo;
    $scope.als=function(){
        console.log('成功向指令中传递方法')
    }
    
})