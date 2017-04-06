/**
 * Created by 米饭 on 2017-03-08.
 */


import * as angular from "angular";

import ArticleDetailCtrl from './ArticleDetailCtrl';

export  default angular.module('articleDetail', ['restangular'])
    .controller('ArticleDetailCtrl',  ArticleDetailCtrl)
    .name;





