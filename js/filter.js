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
    .filter('formatDate',function(){
        return function(input,formatchar){
            var dateArr1=[],
                dateArr2=[];
            var formatchar = formatchar || '-';
            if(input){
                var date=new Date(input),
                y,m,d,h,s,mm;
                y = date.getFullYear();
                m = date.getMonth()+1;
                d = date.getDate();
                h = date.getHours();
                s = date.getSeconds();
                mm = date.getMinutes();
                dateArr1.push(y,m,d);
                dateArr2.push(h,s,mm);
                dateArr1 = dateArr1.join('-');
                dateArr2 = dateArr2.join(':');
                return dateArr1+ ' ' + dateArr2;
            }
        }
    })
