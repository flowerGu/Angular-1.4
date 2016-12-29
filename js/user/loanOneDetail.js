/**
 * Created by gupeiling on 2016/12/19.
 */
var app=angular.module('apps');
app.controller('loanOne',function($scope,$state,$stateParams,$http,ipCookie,analyticsInfo){
    $http.get('./json/loanOne.json?id='+Math.random())
        .then(function(response){
            if(response.data.success){
                var dataItem = response.data.data;
                for(var i=0;i<dataItem.length;i++){
                    if($stateParams.id == dataItem[i].loan.id){
                        $scope.value = dataItem[i];
                        $scope.items = [
                            {ID: '2012', Title: 'Chicago'},
                            {ID: '2013', Title: 'New York'},
                            {ID: '2014', Title: 'Washington'}
                        ];
                        var arrCom=['银达','中信','担保','华信','阳光城'];
                        for(var j=0;j<arrCom.length;j++){
                            if($scope.value.corporation.title.indexOf(arrCom[j])!==-1){
                                var s = j
                                $scope.value.corporation.src = s+1;
                            }
                        }
                    }
                }
            }
    })
    $scope.analyticsInfo = analyticsInfo;
    $scope.buyNow = function(){
        if(!ipCookie('TOKENID')){
            analyticsInfo.locationNext({url:'login'})
        }
    }
})
