/**
 * Created by gupeiling on 2016/12/19.
 */
var app=angular.module('apps');
app.controller('loanOne',function($scope,$state,$stateParams,$http){
    $http.get('./json/loanOne.json?id='+Math.random())
        .then(function(response){
            if(response.data.success){
                var dataItem = response.data.data;
                for(var i=0;i<dataItem.length;i++){
                    if($stateParams.id == dataItem[i].loan.id){
                        console.log($stateParams.id)
                        $scope.value = dataItem[i];
                        var arrCom=['银达','中信','担保','华信','阳光城'];
                        for(var j=0;j<arrCom.length;j++){
                            if($scope.value.corporation.title.indexOf(arrCom[j])!==-1){
                                var s = j
                                $scope.value.corporation.src = s+1;
                                // break;
                            }
                        }
                    }
                }
            }
    })
})
