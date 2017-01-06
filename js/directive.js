/**
 * Created by gupeiling on 2016/12/29.
 */
var app = angular.module('apps');
app.directive('header', function() {
    return {
        replace:false,
        template: function(element,attrs) {
            console.log(attrs)
                return '<div class="common-title">' +
                    '<a ng-click="goBack()" class="back"></a>'+
                    '<span style="margin-left:-30px;" ng-click="fn()">{{name}}</span>' +
                    '</div>'
        },
        scope:{
            fn:"=fn",
            name:'@'
        },
        link:function(scope,element){
            scope.goBack = function(){
                window.history.go(-1)
            }
            scope.name = scope.name || document.title;
            console.log(scope,scope.name)
        }
    };
});
