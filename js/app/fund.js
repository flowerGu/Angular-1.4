/**
 * Created by gupeiling on 2016/12/26.
 */
var app=angular.module('apps');
app.controller('fundCtrl',function($scope,$http,$timeout){
    $http.get('./json/fund.json?md='+Math.random())
        .then(function(response){
            $scope.imageList = response.data.imageList;
            $timeout(function(){
                new Swiper('.swiper-container', {
                    autoplay: 5000,//可选选项，自动滑动
                    loop:true,
                    pagination:'.swiper-pagination',
                    paginationClickable :true
                })
            })
        })
})