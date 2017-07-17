/**
 * Created by 米饭 on 2017-04-12.
 */


import * as angular from "angular";

import tagLoad from '../../commons/tagLoad/tagLoad';
import TagArticleCtrl from "./TagArticleCtrl";
import TagArticleService from "./TagArticleService";

export default angular.module('tagArticle', ['ui.bootstrap', tagLoad])
    .controller('TagArticleCtrl',  TagArticleCtrl)
    .controller('TagArticleService',  TagArticleService)
    .name;

