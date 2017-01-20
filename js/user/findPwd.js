/**
 * Created by gupeiling on 2017/1/20.
 */
var app = angular.module('apps');
app.controller('findPwdCtrl',function($scope){
    $scope.user1 = {
        tels:"",
        fTel:{
            type:'text',
            placeholder:'请输入手机号',
            name:'tels',
            id:'tels',
            ngmaxlength:'11',
            ngpattern:/^1[3-8][0-9]{9}$/,
            required:true,
        },
        show:function(){
            console.log(form.tel.value)
        }
    }
})