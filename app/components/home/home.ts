/**
 * Created by 米饭 on 2017-03-07.
 */


import * as angular from "angular";

import article from './article/article';
import login from './login/login';
import HomeCtrl from './HomeCtrl';


export default angular.module('home', ['ngAnimate', 'ui.bootstrap', 'ui.router', article, login])
    .controller('HomeCtrl',  HomeCtrl)
    .value('navbar', {headerHeight: 350})
    .name;


