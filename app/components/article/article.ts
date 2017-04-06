/**
 * Created by 米饭 on 2017-03-17.
 */


import angular = require('angular');

import articleList from '../articleList/articleList';
import articleEdit from '../articleEdit/articleEdit';
import articleDetail from '../articleDetail/articleDetail';

export default angular.module('article', [articleList, articleEdit, articleDetail]).name;
