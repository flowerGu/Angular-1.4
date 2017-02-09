var app = angular.module('apps');
app.controller('registerCtrl',function($scope,analyticsInfo,e,$interval,$alert){
    $scope.gologin = analyticsInfo.locationNext
    $scope.user = {
        tel:'',
        code:'',
        msgCode:'',
        pwd:'',
        telCom:{//手机号
            name:'tel',
            ngpattern:/^1[3-8][0-9]{9}$/,
            placeholder:'请输入手机号',
        },
        codeCom:{//图形验证码
            name:'code',
            ngpattern:/^\d{5}$/,
            ngmaxlength:5,
            placeholder:'请输入验证码',
        },
        msgCodeCom:{//短信验证码
            name:'msgCode',
            ngpattern:/^\d{6}$/,
            ngmaxlength:6,
            placeholder:'请输入短信验证码',
            optbtn:'发送验证码',
        },
        pwdCom:{
            type:'password',
            name:'pwd',
            id:'pwd',
            ngpattern:/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/,
            placeholder:'请输入6-20位字母数字组合',
            pwdChange:true,
        }
    }    
    $scope.changeText = function() {
        if(form.tel.value == ''){
            $alert({content:'请输入手机号',"duration":100,dismissable:false})
        }
        if($scope.user.telCom.ngpattern.test(form.tel.value) && $scope.user.codeCom.ngpattern.test(form.code.value)){
            if(!angular.element(document.getElementsByClassName('opt-btn')[0]).attr('disabled')){
                analyticsInfo.countDown({ time: 5, attr: 'opt-btn' })
            }
                angular.element(document.getElementsByClassName('opt-btn')[0]).attr('disabled',true)
        }
    }          
        
})