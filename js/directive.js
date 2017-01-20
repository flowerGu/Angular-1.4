/**
 * Created by gupeiling on 2016/12/29.
 */
var app = angular.module('apps');
app.directive('header', function() {
    return {
        replace:false,
        template: function(element,attrs) {
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
        }
    };
});
app.directive('uiinput',function(){
    return {
        replace:true,
        restrict: 'E',
        template:'<div class="form-item"> \
                    <input type="{{nature.type}}" \
                    placeholder={{nature.placeholder}} \
                    name="{{nature.name}}" \
                    id ="{{nature.id}}" \
                    ng-pattern = "nature.ngpattern"\
                    ng-keyup="show()"\
                    required \
                    autocomplete="off" \
                    ng-model="ngModel"/> \
                    <img src="images/close.png" ng-if="ngModel" ng-click = "userDir.delDir()"/>\
                </div>',
        link:function(scope,element,attrs){
            var attr = scope.nature;
            scope.show = function(){
                if(attr.ngpattern){
                    if(!attr.ngpattern.test(scope.ngModel)){
                        angular.element(document.getElementById(attr.id)).addClass('error');
                    }else{
                        angular.element(document.getElementById(attr.id)).removeClass('error');
                    }
                }
                // console.log(scope.ngModel,scope.nature.ngpattern)
            }

            scope.userDir={
                delDir : function(){
                    scope.ngModel = '';
                   // console.log(scope.ngModel.$valid,scope.ngModel)
                }
            }
        },
        scope:{
            nature:'=',
            ngModel:'='
        }
    }
})

