/**
 * Created by 米饭 on 2017-03-08.
 */


import * as angular from "angular";

import ArticleListCtrl from './ArticleListCtrl';
import articleLoad from '../../../../commons/ArticleLoad/articleLoad';

export default angular.module('articleList', ['ui.bootstrap', 'restangular', articleLoad])
    .controller('ArticleListCtrl',  ArticleListCtrl)
    .name;

