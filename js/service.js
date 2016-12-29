/**
 * Created by gupeiling on 2016/12/22.
 */
var app=angular.module('apps');
app.service('analyticsInfo',function($state){
   this.locationNext = function(opts){
       if(opts.url){
           $state.go(opts.url);
       }
   };

})