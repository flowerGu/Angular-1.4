/**
 * Created by gupeiling on 2017/1/20.
 */
var app = angular.module('apps');
app.controller('findPwdCtrl',function($scope){
    $scope.user = {
        tels:"",
        fTel:{
            type:'text',
            placeholder:'请输入手机号',
            name:'tel',
            id:'tel',
            ngmaxlength:'11',
            ngpattern:/^1[3-8][0-9]{9}$/,
            required:true,
        },
        show:function(){
            console.log(form.tel.value)
        }
    }
})