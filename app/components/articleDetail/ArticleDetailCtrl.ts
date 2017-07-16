/**
 * Created by 米饭 on 2017-04-01.
 */

import {IStateParamsService} from "@types/angular-ui-router";
import ArticleLoadService from "../../commons/articleLoad/ArticleLoadService";
import {IArticle} from "../../commons/articleLoad/articleLoad";
import {ISCEService} from "angular";
import {IReview} from "../../commons/reviewLoad/ReviewLoadService";
import ReviewLoadService from "../../commons/reviewLoad/ReviewLoadService";

/*@ngInject*/
export default class ArticleDetailCtrl {

    article: IArticle;
    reviewList: IReview;

    constructor(private $sce: ISCEService, $stateParams: IStateParamsService,
                ArticleLoadService: ArticleLoadService,
                ReviewLoadService: ReviewLoadService) {
        this.article = ArticleLoadService.load($stateParams.articleId).$object;
        this.reviewList = ReviewLoadService.loadArticleReviews($stateParams.articleId, {page: 0, size: 5}).$object;
        console.log(this.reviewList);
    }
}