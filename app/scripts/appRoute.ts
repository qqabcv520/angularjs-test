/**
 * Created by 米饭 on 2017-03-05.
 */

import {ui} from "angular";
import IStateProvider = ui.IStateProvider;
import IUrlRouterProvider = ui.IUrlRouterProvider;

const homeHtml: string = require("../components/home/home.html");
const articleListHtml: string = require('../components/articleList/articleList.html');
const articleDetailHtml: string = require('../components/articleDetail/articleDetail.html');
const articleEditHtml: string = require('../components/articleEdit/articleEdit.html');
const tagListHtml: string = require('../components/tagList/tagList.html');
const loginHtml: string = require('../components/login/login.html');

/*@ngInject*/
export default function appRoute($stateProvider: IStateProvider,
                                 $urlRouterProvider: IUrlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            template: homeHtml,
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            abstract: true
        });
}