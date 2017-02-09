/**
 * Created by gupeiling on 2016/12/29.
 */
var app = angular.module('apps');
app.directive('header', function () {
    return {
        restrict: "EA",
        scope: {
            fnExecute: "&",
            name: '@',
            subName: '@'
        },
        template: '<div class="common-title"> \
                    <a ng-click="goBack()" class="back"></a> \
                    <span style="margin-left:-10px;" >{{name}}</span> \
                    <span style="float:right;margin-right:2rem;" ng-click="fnExecute()">{{subName}}</span>\
                    </div>'
        ,
        link: function (scope, element, attrs) {
            scope.goBack = function () {
                window.history.go(-1)
            }
            scope.name = scope.name || document.title;
        },

    };
});
app.directive('uiInput', function (analyticsInfo) {
    return {
        replace: true,
        restrict: 'EA',
        template: '<div class="form-item"> \
                    <input type="{{nature.type}}" \
                    placeholder={{nature.placeholder}} \
                    name="{{nature.name}}" \
                    id ="{{nature.id}}" \
                    ng-pattern = "nature.ngpattern"\
                    ng-keyup="userDir.show()"\
                    required \
                    autocomplete="off" \
                    ng-model="ngModel"/> \
                    <span ng-if="nature.optbtn" class="opt-btn" ng-click="fnBtn()">{{nature.optbtn}}</span>\
                    <img src="images/close.png" ng-if="ngModel" ng-click = "userDir.delDir()"/>\
                    <img src= "images/eye.png" class="changeType" ng-if="nature.pwdChange" ng-click = "userDir.changeType()" style="width:21px;right:8%;">\
                </div>',
        scope: {
            nature: '=',
            ngModel: '=',
            fnBtn: '&'
        },
        link: function (scope, element, attrs) {
            scope.nature.type = scope.nature.type || 'text'
            var attr = scope.nature;
            if (scope.nature.ngmaxlength) {
                element.find('input').attr('maxlength', attr.ngmaxlength)
            }
            scope.userDir = {
                delDir: function () {
                    scope.ngModel = '';
                    // console.log(scope.ngModel.$valid,scope.ngModel)
                },
                show: function () {
                    if (attr.ngpattern && attr.id) {
                        if (!attr.ngpattern.test(scope.ngModel)) {
                            angular.element(document.getElementById(attr.id)).addClass('error');
                        } else {
                            angular.element(document.getElementById(attr.id)).removeClass('error');
                        }
                    }
                },
                changeType: function () {//改变input框类型
                    var ele = element.find('input');
                    if (ele.attr('type') == 'password') {
                        ele.attr({ 'type': 'text' })
                        angular.element(document.getElementsByClassName('changeType')).attr({ 'src': 'images/eyelight.png' })
                    } else {
                        ele.attr({ 'type': 'password' })
                        angular.element(document.getElementsByClassName('changeType')).attr({ 'src': 'images/eye.png' })
                    }
                },
            }
        },
       
    }
})

