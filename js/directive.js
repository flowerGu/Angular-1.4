/**
 * Created by gupeiling on 2016/12/29.
 */
var app = angular.module('apps');
app.directive('header', function() {
    return {
        scope:{},
        template: function() {
            return '<div class="common-title"><a ng-click="goBack()" class="back"></a>'+ document.title +'</div>'
        },
        controller:function($scope){
            $scope.goBack = function(){
                window.history.go(-1)
            }
        }
    };
});
