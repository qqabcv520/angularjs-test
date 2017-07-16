/**
 * Created by 米饭 on 2017-07-12.
 */
import * as angular from "angular";
import tagLoad from '../../commons/tagLoad/tagLoad';
import TagListCtrl from "./TagListCtrl";



export default angular.module('tagList', ['ui.bootstrap', tagLoad])
    .controller('TagListCtrl',  TagListCtrl)
    .name;

