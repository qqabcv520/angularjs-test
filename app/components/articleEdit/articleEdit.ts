/**
 * Created by 米饭 on 2017-03-17.
 */


import * as angular from 'angular';

import ArticleEditCtrl from './ArticleEditCtrl';

import wangEditorDirective from '../../commons/wangEditor/wangEditorDirective';
import tagLoad from '../../commons/tagLoad/tagLoad';


export default angular.module('articleEdit', ['ui.select', 'ngSanitize', wangEditorDirective, tagLoad])
    .controller('ArticleEditCtrl', ArticleEditCtrl)
    .name;
