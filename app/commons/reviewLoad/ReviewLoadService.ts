import {IPromise, IService} from "restangular";
/**
 * Created by 米饭 on 2017-07-08.
 */


/*@ngInject*/
export default class ReviewLoadService {


    constructor(private Restangular: IService) {

    }


    /**
     * 获取文章评论
     * @param articleId
     * @param param
     * @returns {ICollectionPromise<any>}
     */
    loadArticleReviews(articleId: number, param?: {page?: number, size?: number, reviewSize?: number}): IPromise<Array<IReview>> {
        return this.Restangular.one("articles", articleId).all("reviews").getList<IReview>(param);
    }
}

export interface IReview {

}