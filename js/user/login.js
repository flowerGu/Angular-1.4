/**
 * Created by gupeiling on 2016/12/28.
 */
var app = angular.module('apps');
app.controller('loginCtrl',function($scope,ipCookie,analyticsInfo){
    $scope.save = function(){
        //ipCookie('cookieName','tokenid',{expires:100,expirationUnit:'seconds'})
    };
    $scope.user={
            tel:'',
            minlength:6
    };
    $scope.checkValue = function(){
       console.log(1)
    }
})