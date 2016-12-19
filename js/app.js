angular.module('apps',["ui.router", "oc.lazyLoad","ui.grid","ui.bootstrap"])
    .config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/home");//$urlRouterProvider负责监听 $location。
        $stateProvider.state('home',{
            url:'/home',
            templateUrl: 'regular.html',
            controller:'regularCtrl',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/app/regularFinacial.js");
                }]
            }
        })
        .state('safeFinacial',{
            url:'/safeFinacial',
            templateUrl:'aboutAs.html',
            controller:'insuranceCtrl',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/app/insuranceFin.js");
                }]
            }
        })
        .state('tab',{
            url:'/tab',
            templateUrl:'tab.html',
            controller:'tabchange',
            controllerAs:'vm',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                   console.log('保险')
                 }]
            }
        })
        .state('loanOneDetail',{
            // params:{'title':null},
            url:'/loanOneDetail/title',
            templateUrl:'loanOneDetail.html',
            controller:'loanOne',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/app/loanOneDetail.js");
                }]
            }
        })

    }])
    .controller('tabchange', function ($scope,CalcService) {//标签切换
        this.tab=1;
    })
    .controller('CalcController',function($scope,CalcService){
        console.log(CalcService.square(17))
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
