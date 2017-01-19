/**
 * Created by gupeiling on 2016/12/28.
 */
var app = angular.module('apps');
app.controller('loginCtrl',function($scope,ipCookie,analyticsInfo,$modal,$alert){
        $scope.user={
            tel:"",
            pwd:"",
            telCom:{
                type:'text',
                placeholder:'请输入手机号',
                name:'tel',
                id:'tel',
                ngmaxlength:'11',
                ngpattern:'/^1[3-8][0-9]{9}$/',
                required:true,
                dirty:'form.tel.$dirty',
                invalid:'form.tel.$invalid',
            },
            pwdCom:{
                type:'password',
                placeholder:'请输入登录密码',
                name:'pwd',
                id:'tel',
                ngmaxlength:'11',
                // ngpattern:'/^1[3-8][0-9]{9}$/',
                required:true,
                dirty:'form.pwd.$dirty',
                invalid:'form.pwd.$invalid',
            }
        }
    $scope.telArr=['15726684112','15726684111'];
    $scope.arr = [{name:'laly',age:30,sex:'girl'}, {name:'Tom Sanior', age:50},{name:'Tom', age:20}, {name:'May',age:60}]
    $scope.checkValue = function(){
        if($scope.telArr.indexOf(form.tel.value)==-1){
            $modal({title:'提示',content:'没有对应数据', show: true})
            return false;
        }
        if(form.pwd.value !='123456.'){
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
                analyticsInfo.locationNext({url:'home'})
            }
            });

    };
    angular.element(window).bind('load', function() {
        alert('1');
    });
})