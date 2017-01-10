/**
 * Created by gupeiling on 2016/12/28.
 */
var app = angular.module('apps');
app.controller('loginCtrl',function($scope,ipCookie,analyticsInfo,$modal,$compile,$interval){
    $scope.save = function(){
        //ipCookie('cookieName','tokenid',{expires:100,expirationUnit:'seconds'})
    };
    $scope.user={
            tel:'',
            minlength:6,

    };
    $scope.checkValue = function(){
        if($scope.user.tel !='15726684112'){
            $modal({animation:'am-fade',title:'提示',content:'没有对应数据', show: true})
            return false;
        }
        // if(form.user-pwd.value !='12345.'){
        //     alert('密码错误');
        //     return false;
        // }
    };
         // var myModal = $modal({title: 'My Title', content: 'My Content', show: true});
        // var myOtherModal = ;
        $scope.showModal = function() {
            //  myOtherModal.$promise.then(
            //     myOtherModal.show
            // );

        };
        // console.log($rootScope)


})