angular.module('apps',["ui.router", "oc.lazyLoad","ui.grid","ui.bootstrap"])
    .config(["$stateProvider","$urlRouterProvider",routeConfig])
    .run(['$rootScope',function($rootScope) {
        $rootScope.$on("$stateChangeSuccess",function(ev, to, toParams, from, fromParams){//UI-route路由器发生变化1.$stateChangeError;2.$stateChangeStart;3.$stateChangeSuccess;4.$stateNotFound
           //  var showNavTag=["home","safeFinacial","tab"];
           // if(showNavTag.indexOf(to.name)>-1){//加载时，判断顶部nav显示
           //     document.getElementsByClassName('nav-list-page')[0].style.display='';
           // }else{
           //     document.getElementsByClassName('nav-list-page')[0].style.display='none';
           // }
           document.title = to.title;//设置标题
        });
    }])
    .controller('tabchange', function ($scope,CalcService,$location) {//标签切换
        this.tab=1;
    })
    .controller('CalcController',function($scope,CalcService,$location,$state){
        // CalcService.square(17)
        $scope.$on("$viewContentLoaded",function(){
            var showNavTag=["home","safeFinacial","tab"]
            if(showNavTag.indexOf($state.current.name)>-1){//加载时，判断顶部nav显示
                document.getElementsByClassName('nav-list-page')[0].style.display='';
            }else{
                document.getElementsByClassName('nav-list-page')[0].style.display='none';
            }
        });
    })
    .factory('MathService', function() {
        var factory = {};
        factory.multiply = function(a, b) {
            return a * b;
        }
        return factory;
    })
    .service('CalcService', function(MathService){
        this.square = function(a) {
            return MathService.multiply(a, a);
        }
    })
function routeConfig($stateProvider,$urlRouterProvider){//路由配置
    $urlRouterProvider.otherwise("/home");//$urlRouterProvider负责监听 $location。
    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'html/regular.html',
        controller:'regularCtrl',
        title:'主页',
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/app/regularFinacial.js");
            }]
        }
    })
        .state('safeFinacial',{
            url:'/safeFinacial',
            templateUrl:'html/aboutAs.html',
            controller:'insuranceCtrl',
            title:'保险理财',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/app/insuranceFin.js");
                }]
            }
        })
        .state('tab',{
            url:'/tab',
            templateUrl:'html/tab.html',
            controller:'tabchange',
            controllerAs:'vm',
            title:'保险',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    console.log('保险')
                }]
            }
        })
        .state('loanOneDetail',{
            // params:{'title':null},
            url:'/loanOneDetail/?:title:id',
            templateUrl:'html/loanOneDetail.html',
            controller:'loanOne',
            title:'理财详情',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/app/loanOneDetail.js");
                }]
            }
        })
    // $state.transitionTo($state.current, $stateParams, {
    //     reload: true, inherit: false, notify: true
    // });
}
