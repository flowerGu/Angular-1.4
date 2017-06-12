angular.module('apps',["ui.router", "oc.lazyLoad","ui.grid","ui.bootstrap","ipCookie","mgcrea.ngStrap.modal","mgcrea.ngStrap.alert"])
    .config(["$stateProvider","$urlRouterProvider",routeConfig])
    .run(['$rootScope',function($rootScope,$location) {
        $rootScope.$on("$stateChangeSuccess",function(ev, to, toParams, from, fromParams){//UI-route路由器发生变化1.$stateChangeError;2.$stateChangeStart;3.$stateChangeSuccess;4.$stateNotFound
            var showNavTag=["home","safeFinacial","myWealth"];
               if(showNavTag.indexOf(to.name)>-1){//加载时，判断顶部nav显示
               document.getElementsByClassName('nav-list-page')[0].style.display='';
               var url = to.url//页面重新加载时，给指定的导航选项添加高亮
               var oUL = document.getElementsByClassName('nav-list-page')[0].querySelectorAll('li');
               for(var i = 0;i<oUL.length;i++){
                   var itemUrl = oUL[i].childNodes[0].getAttribute('href') && oUL[i].childNodes[0].getAttribute('href').replace(/#/,'');
                   if(itemUrl == url){
                       $rootScope.active = i
                   }
               }
               if(to.name=='myWealth'){//主页
                   $rootScope.active = 2;
               }
           }else{
               document.getElementsByClassName('nav-list-page')[0].style.display='none';
           }
           document.title = to.title;//设置标题
        });

    }])
    .controller('CalcController',function($scope,CalcService,$location,$state,$modal,$rootScope,ipCookie,analyticsInfo){
        // CalcService.square(17)
        // $scope.$on("$viewContentLoaded",function(){
        //     var showNavTag=["home","safeFinacial","tab"];
        //     if(showNavTag.indexOf($state.current.name)>-1){
        //          document.getElementsByClassName('nav-list-page')[0].style.display='';//加载时，判断顶部nav显示
        //     }else{
        //          document.getElementsByClassName('nav-list-page')[0].style.display='none';
        //     }
        // });
        // console.log($scope.active)
        // console.log($location.url())
        $rootScope.isLogin = function(){
            if(!ipCookie('TOKENID')){
                analyticsInfo.locationNext({url:'login'})
            }else{
                analyticsInfo.locationNext({url:'myWealth'})
            }
        }
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
    // angular.forEach(stateArr,function(data){
    //     $stateProvider.state(data.stateName,data.stateConfig)
    // })
    $stateProvider.state('home',{
                url:'/home',
                templateUrl: 'html/regular.html',
                controller:'regularCtrl',
                title:'主页',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load("js/user/regularFinacial.js");
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
                        return $ocLazyLoad.load("js/user/insuranceFin.js");
                    }]
                }
            })
        .state('fund',{
                url:'/fund',
                templateUrl:'html/fund.html',
                controller:'fundCtrl',
                title:'基金',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load("js/user/fund.js");
                    }]
                }
            }
        )
        .state('platformData',{
                url:'/platformData',
                templateUrl:'html/platformData.html',
                controller:'platformDataCtrl',
                // controllerAs:'vm',
                title:'保险',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/platformData.js');
                    }]
                }
            }
        )
        .state('loanOneDetail',{
                // params:{'title':null},
                url:'/loanOneDetail?:title:id',
                templateUrl:'html/loanOneDetail.html',
                controller:'loanOne',
                title:'理财详情',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load("js/user/loanOneDetail.js");
                    }]
                }
            }
        )
        .state('loanRecord',{
            url:'/loanRecord',
            templateUrl:'html/loanDetailRecords.html',
            controller:'loanRecords',
            title:'购买记录',
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load('js/user/loanDetailRecords.js');
                }]
            }
        }
        )
        .state('login',{
                url:'/login',
                templateUrl:'html/login.html',
                controller:'loginCtrl',
                title:'登录',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/login.js');
                    }
                    ]}
            }
        )
         .state('myWealth',{
                url:'/myWealth',
                templateUrl:'html/my.html',
                controller:'myWealthCtrl',
                title:'我的',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/my.js');
                    }
                    ]}
            }
        )
        .state('annuity',{
                url:'/annuity?:productId',
                templateUrl:'html/annuityDetail.html',
                controller:'annuity',
                title:'保险详情',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/annuity.js');
                    }]
                }
            }
        )
        .state('notice',{
                url:'/notice?:type',
                templateUrl:'html/notice.html',
                controller:'noticeController',
                title:'产品须知',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/notice.js');
                    }]
                }
            }
        )
        .state('findPwd',{
                url:'/findPwd',
                templateUrl:'html/findPwd.html',
                controller:'findPwdCtrl',
                title:'忘记密码',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/findPwd.js');
                    }]
                }
            }
        )
        .state('register',{
                url:'/register',
                templateUrl:'html/register.html',
                controller:'registerCtrl',
                title:'注册',
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load('js/user/register.js');
                    }]
                }
            }
        )
    // $state.transitionTo($state.current, $stateParams, {
    //     reload: true, inherit: false, notify: true
    // });
}
