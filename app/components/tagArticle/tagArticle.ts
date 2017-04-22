/**
 * Created by 米饭 on 2017-04-12.
 */


import * as angular from "angular";

import articleLoad from '../../commons/articleLoad/articleLoad';
import TagArticleCtrl from "./TagArticleCtrl";
import TagArticleService from "./TagArticleService";

export default angular.module('tagArticle', ['ui.bootstrap', 'restangular', articleLoad])
    .controller('ArticleListCtrl',  TagArticleCtrl)
    .controller('TagArticleService',  TagArticleService)
    .name;

