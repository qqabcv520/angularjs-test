/**
 * Created by 米饭 on 2017-04-06.
 */

import {ui} from "angular";
import IStateProvider = ui.IStateProvider;
import IUrlRouterProvider = ui.IUrlRouterProvider;
import {INavbarConfig} from "./home";

const articleListHtml: string = require('../../components/articleList/articleList.html');
const articleDetailHtml: string = require('../../components/articleDetail/articleDetail.html');
const articleEditHtml: string = require('../../components/articleEdit/articleEdit.html');
const tagListHtml: string = require('../../components/tagList/tagList.html');
const tagArticleHtml: string = require('../../components/tagArticle/tagArticle.html');
const loginHtml: string = require('../../components/login/login.html');

/*@ngInject*/
export default function appRoute($stateProvider: IStateProvider,
                                 $urlRouterProvider: IUrlRouterProvider) {

    $urlRouterProvider.when('/home', '/home/articleList');
    $stateProvider
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
        .state('home.tagArticle', {
            url: '/tagArticle',
            template: tagArticleHtml,
            controller: 'TagArticleCtrl',
            controllerAs: 'vm',
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
    function enterLogin(navbar: INavbarConfig) {
        navbar.headerHeight = -10000;//永不透明
    }


    /*@ngInject*/
    function exitLogin(navbar: INavbarConfig) {
        navbar.headerHeight = 350;
    }
}