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
                    name="tel" \
                    id ="{{nature.id}}" \
                    ng-maxlength="{{nature.ngmaxlength}}" \
                    ng-pattern="{{nature.ngpattern}}" \
                    required \
                    ng-keyup="isShow()" \
                    autocomplete="off" \
                    ng-model="ngModel"/> \
                    <img src="images/close.png" style="display:none" ng-click = delDir()/>\
                </div>',
        link:function(scope,element,attrs){
            scope.userDir={
                isShow : function(e){
                    var e = e || window.event
                    var target = e.target || e.srcElement;
                    if(target.value.length>0){
                        console.log(target.id)
                        angular.element(document.getElementById(target.id)).next().css({'display':'block'})
                    }else{
                        angular.element(document.getElementById(target.id)).next().css({'display':'none'})
                    }
                },
                delDir : function(e){

                }
            }
        },
        scope:{
            nature:'=',
            ngModel:'='
        }
    }
})

