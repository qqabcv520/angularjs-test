/**
 * Created by 米饭 on 2017-03-07.
 */


import * as angular from "angular";

import login from '../login/login';
import articleList from '../articleList/articleList';
import articleEdit from '../articleEdit/articleEdit';
import articleDetail from '../articleDetail/articleDetail';

import HomeCtrl from './HomeCtrl';
import homeRoute from './homeRoute';


export default angular.module('home', ['ngAnimate', 'ui.bootstrap', 'ui.router', login, articleList, articleEdit, articleDetail])
    .controller('HomeCtrl',  HomeCtrl)
    .config(homeRoute)
    .value('navbar', {headerHeight: 350})
    .name;


export interface INavbarConfig {
    headerHeight: number
}