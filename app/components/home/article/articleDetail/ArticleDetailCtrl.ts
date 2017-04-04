/**
 * Created by 米饭 on 2017-04-01.
 */

import {IStateParamsService} from "@types/angular-ui-router";
import ArticleLoadService from "../../../../commons/ArticleLoad/ArticleLoadService";

/*@ngInject*/
export default class ArticleDetailCtrl {

    loader: ArticleLoadService;

    constructor($stateParams: IStateParamsService, ArticleLoadService: ArticleLoadService) {
        ArticleLoadService.load($stateParams.articleId);
        this.loader = ArticleLoadService;
    }
}