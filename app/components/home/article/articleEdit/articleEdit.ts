/**
 * Created by 米饭 on 2017-03-17.
 */


import * as angular from 'angular';

import ArticleEditCtrl from './ArticleEditCtrl';

import wangEditorDirective from '../../../../commons/wangEditor/wangEditorDirective';


export default angular.module('articleEdit', ['ui.select', 'ngSanitize', wangEditorDirective])
    .controller('ArticleEditCtrl', ArticleEditCtrl)
    .name;


