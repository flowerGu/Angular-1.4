/**
 * Created by gupeiling on 2016/12/28.
 */
var app = angular.module('apps');
app.controller('loginCtrl',function($scope,ipCookie,analyticsInfo,$modal,$alert){

    $scope.user={
            tel:'',
            pwd:'',
            minlength:6,
    };
    $scope.telArr=['15726684112','15726684111']
    $scope.checkValue = function(){
        if($scope.telArr.indexOf(form.tel.value)>-1){
            $modal({title:'提示',content:'没有对应数据', show: true})
            return false;
        }
        if(form.pwd.value !='12345.'){
            $modal({title:'提示',content:'密码输入有误', show: true})
            return false;
        }
        $alert({
            "title": "提示!",
            "content": "登录成功",
            "duration":1,//s
            "placement":'top',
            "show":true,
            "type":'info',
            "dismissable":false,
            "onHide":function(){
                ipCookie('TOKENID',form.pwd.value,{expires:100,expirationUnit:'seconds'})
            }
            });

    };



})