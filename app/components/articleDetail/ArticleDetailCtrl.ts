/**
 * Created by 米饭 on 2017-04-01.
 */

import {IStateParamsService} from "@types/angular-ui-router";
import ArticleLoadService from "../../commons/articleLoad/ArticleLoadService";
import {IArticle} from "../../commons/articleLoad/articleLoad";
import {ISCEService} from "angular";

/*@ngInject*/
export default class ArticleDetailCtrl {

    article: IArticle;

    constructor(private $sce: ISCEService, $stateParams: IStateParamsService, ArticleLoadService: ArticleLoadService) {
        this.article = ArticleLoadService.load($stateParams.articleId).$object;
    }
}