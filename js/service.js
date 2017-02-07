/**
 * Created by gupeiling on 2016/12/22.
 */
var app=angular.module('apps');
app.service('analyticsInfo',function($state,$interval,$q){
   this.locationNext = function(opts){//页面跳转
       if(opts.params){
           $state.go(opts.url,opts.params)
       }else{
           $state.go(opts.url);
       }
   };
   this.countDown = function(opts){//倒计时
       console.log(1)
       var deferred = $q.defer();
       var promise = deferred.promise;
       promise.then(function(){
            angular.element(document.getElementsByClassName(opts.attr)[0]).html('重新发送')
       })
      deferred.resolve(function(){
            var timer = $interval(function(){
                angular.element(document.getElementsByClassName(opts.attr)[0]).html(--opts.time+'秒后重新发送')
            },1000,60)
      })
       
       
       
   }
})
app.value('e',1)
