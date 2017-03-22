/**
 * Created by 米饭 on 2017-03-05.
 */

(function() {
    'use strict';


    angular.module('myApp', ['pascalprecht.translate', 'restangular', 'ui.router', 'LocalStorageModule', 'home'])
        .config(appConfig)
        .config(appRoute)
        .run(appRun);
        // .constant("defaultLang", window.localStorage.lang || 'zh-cn')
        // .constant("localToken", window.localStorage.token);



    appConfig.$inject = ['$translateProvider'];
    function appConfig($translateProvider) {

        $translateProvider.preferredLanguage('zh-cn');//语言
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');//设置HTML转义策略,在有参数时清除
        $translateProvider.useStaticFilesLoader({
            prefix: 'language/',
            suffix: '.json'
        });


    }




    appRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appRoute($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/home', '/home/articleList').otherwise('/home/articleList');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl',
                abstract: true
            })
            .state('home.articleList', {
                url: '/articleList',
                templateUrl: 'article/articleList.html',
                controller: 'ArticleListCtrl'
            })
            .state('home.articleDetail', {
                url: '/articleDetail/{articleId:[0-9]{1,6}}',
                templateUrl: 'article/articleDetail.html',
                controller: 'ArticleDetailCtrl'
            })
            .state('home.articleEdit', {
                url: '/articleEdit',
                templateUrl: 'article/articleEdit.html',
                controller: 'ArticleEditCtrl'
            })
            .state('home.tagList', {
                url: '/tagList',
                templateUrl: 'tag/tagList.html'
                // controller: 'TagListCtrl'
            })
            .state('home.login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl',
                onEnter: enterLogin,
                onExit: exitLogin
            });

        enterLogin.$inject = ['navbar'];
        function enterLogin(navbar) {
            navbar.headerHeight = -10000;//永不透明
        }


        exitLogin.$inject = ['navbar'];
        function exitLogin(navbar) {
            navbar.headerHeight = 350;
        }
    }

    appRun.$inject = ['Restangular', '$translate', 'localStorageService', '$rootScope'];
    function appRun(Restangular, $translate, localStorageService, $rootScope) {


        Restangular.setBaseUrl('http://192.168.1.101:8080/myblog');


        $rootScope.token = localStorageService.get('token');

        $rootScope.$watch('token', function (newVal) {
            Restangular.setDefaultHeaders({token: newVal});
            localStorageService.set('token', newVal);
        });


        $rootScope.token = localStorageService.get('token');

        $rootScope.$watch('token', function (newVal) {
            Restangular.setDefaultHeaders({token: newVal});
            localStorageService.set('token', newVal);
        });

        $rootScope.currentLang = localStorageService.get('currentLang') || 'zh-cn';

        $rootScope.$watch('currentLang', function (newVal) {
            if(newVal == null) {
                return;
            }
            localStorageService.set('currentLang', newVal);

            $translate.use($rootScope.currentLang);
        });
    }

})();

