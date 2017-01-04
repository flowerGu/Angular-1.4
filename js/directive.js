/**
 * Created by gupeiling on 2016/12/29.
 */
var app = angular.module('apps');
app.directive('header', function() {
    return {
        replace:false,
        template: function(element,attrs) {
            if(attrs.name){
                return '<div class="common-title">' +
                    '<a ng-click="goBack()" class="back"></a>'+
                    '<span style="margin-left:-30px;">'+attrs.name +'</span>' +
                    '</div>'
            }else{
                return '<div class="common-title">' +
                    '<a ng-click="goBack()" class="back"></a>'+
                    '<span style="margin-left:-30px;">'+document.title +'</span>' +
                    '</div>'
            }

        },
        controller:function($scope){
            $scope.goBack = function(){
                window.history.go(-1)
            }
        }
    };
});
