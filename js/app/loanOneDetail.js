/**
 * Created by gupeiling on 2016/12/19.
 */
var app=angular.module('apps');
app.controller('loanOne',function($scope,$state,$stateParams){
    // $state.forceReload();
    $scope.data=$stateParams
    // console.log($stateParams.$state)
})
