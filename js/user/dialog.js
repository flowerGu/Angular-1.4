/**
 * Created by gupeiling on 2016/12/12.
 */
var app=angular.module('apps');
app.controller('oneCtrl',function($scope,$modal,$log){
    $scope.items = ['html5','jq','FE-演示平台'];
    $scope.openDialog = function(){
        var modalInstance = $modal.open({
            templateUrl:'regulars.html',
            controller:'ModalInstanceCtrl',
            keyboard:false,//esc键隐藏dialog
            backdrop:false,//背景隐藏
            size:'sm',//弹框大小,lg大，sm小
            resolve:{
                items:function(){
                    return $scope.items;
                }
            }
        })
        modalInstance.result.then(function(){//点击确认，回调函数
            // window.location.href='www.baidu.com'
        },function(){
            $log.info('2')
        })
    }
})
app.controller('ModalInstanceCtrl', function ($scope,$modalInstance,items) {
    $scope.ok = function(){
        $modalInstance.close(); //关闭并返回当前选项
    };
    $scope.cancel = function(){
        $modalInstance.dismiss(); // 退出
    }
});

