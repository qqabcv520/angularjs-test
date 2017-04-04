/**
 * Created by 米饭 on 2017-03-05.
 */

import * as angular from "angular";

const homeHtml: string = require("../components/home/home.html");
const articleListHtml: string = require('../components/home/article/articleList/articleList.html');
const articleDetailHtml: string = require('../components/home/article/articleDetail/articleDetail.html');
const articleEditHtml: string = require('../components/home/article/articleEdit/articleEdit.html');
const tagListHtml: string = require('../components/home/tag/tagList.html');
const loginHtml: string = require('../components/home/login/login.html');

/*@ngInject*/
export default function appRoute($stateProvider: angular.ui.IStateProvider,
                                 $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    $urlRouterProvider.when('/home', '/home/articleList').otherwise('/home/articleList');
    $stateProvider
        .state('home', {
            url: '/home',
            template: homeHtml,
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            abstract: true
        })
        .state('home.articleList', {
            url: '/articleList',
            template: articleListHtml,
            controller: 'ArticleListCtrl',
            controllerAs: 'vm'
        })
        .state('home.articleDetail', {
            url: '/articleDetail/{articleId:[0-9]{1,6}}',
            template: articleDetailHtml,
            controller: 'ArticleDetailCtrl',
            controllerAs: 'vm'
        })
        .state('home.articleEdit', {
            url: '/articleEdit',
            template: articleEditHtml,
            controller: 'ArticleEditCtrl',
            controllerAs: 'vm'
        })
        .state('home.tagList', {
            url: '/tagList',
            template: tagListHtml
            // controller: 'TagListCtrl'
        })
        .state('home.login', {
            url: '/login',
            template: loginHtml,
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            onEnter: enterLogin,
            onExit: exitLogin
        });

    /*@ngInject*/
    function enterLogin(navbar) {
        navbar.headerHeight = -10000;//永不透明
    }


    /*@ngInject*/
    function exitLogin(navbar) {
        navbar.headerHeight = 350;
    }
}