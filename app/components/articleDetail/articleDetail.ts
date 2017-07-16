/**
 * Created by 米饭 on 2017-03-08.
 */


import * as angular from "angular";

import articleLoad from '../../commons/articleLoad/articleLoad';
import reviewLoad from '../../commons/reviewLoad/reviewLoad';
import ArticleDetailCtrl from './ArticleDetailCtrl';

export  default angular.module('articleDetail', [articleLoad, reviewLoad])
    .controller('ArticleDetailCtrl',  ArticleDetailCtrl)
    .name;





