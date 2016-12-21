/**
 * Created by gupeiling on 2016/12/15.
 */
var app=angular.module('apps');
app.filter('separator',function(){
    return function(input){
        if(input){
            input = input.toString().replace(/[^0-9]+/g,'').split('').reverse().join('').replace(/(\d{3})/g,"$1,").replace(/\,$/,'').split('').reverse().join('')
            return input
        }
    }
})
