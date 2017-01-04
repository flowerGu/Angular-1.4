/**
 * Created by gupeiling on 2016/12/30.
 */
var app = angular.module('apps');
app.controller('annuity',function($scope,$http){
    $http.get('./json/annuity.json?md='+Math.random())
        .then(function(response){
            if(response.data.data){
                $scope.data = response.data.data;
                angular.element(document).find('dd.readme').append($scope.data.insFeature)
            }
        })
})