var app=angular.module('apps');
app.controller('regularCtrl',function($scope,$http,$state){
        $http.get('../json/regular.json')
            .then(function(response){
                $scope.list=response.data;
            },function(response){
                console.log('error');
            })
        $scope.loanListMap= (item)=>{
            $state.go("loanOneDetail",{id:item.id})
        }
    }
)