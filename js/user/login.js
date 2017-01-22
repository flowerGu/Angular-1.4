/**
 * Created by gupeiling on 2016/12/28.
 */
var app = angular.module('apps');
app.controller('loginCtrl',function($scope,$http,ipCookie,analyticsInfo,$modal,$alert,$q,$stateParams){
        $scope.user={
            name:'登录',
            tel:"",
            pwd:"",
            telCom:{
                type:'text',
                placeholder:'请输入手机号',
                name:'tel',
                ngmaxlength:'11',
                ngpattern:/^1[3-8][0-9]{9}$/,
                required:true,
                dirty:'form.tel.$dirty',
                invalid:'form.tel.$invalid',
            },
            pwdCom:{
                type:'password',
                placeholder:'请输入登录密码',
                name:'pwd',
                ngmaxlength:'11',
                required:true,
                ngpattern:/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
                dirty:'form.pwd.$dirty',
                invalid:'form.pwd.$invalid',
            }
        }
    $scope.telArr=['15726684112','15726684111'];
    // $scope.arr = [{name:'1laly',age:30,sex:'girl'}, {name:'Tom Sanior', age:150},{name:'Tom', age:20}, {name:'May',age:160}]
    $scope.checkValue = function(){
        console.log(form.tel.value)
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
    // var defer = $q.defer();
    // var promise = defer.promise;
    // promise.then(function(value){//成功回调
    //     if(value>10){
    //         console.log('排队人数太多')
    //     }
    // },function(value){//失败回调
    //     console.log('error')
    // },function(){//状态变更回调
    //     console.log('notify')
    // })
    // defer.resolve($http.get('./json/annuity.json?md='+Math.random())
    //     .then(function(response){
    //         if(response.data.data){
    //             $scope.data = response.data.data;
    //             return $scope.data.insAreaList.length
    //         }
    //     }))//解决异步问题
})