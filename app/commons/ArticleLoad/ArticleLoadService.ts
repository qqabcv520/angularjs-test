/**
 * Created by 米饭 on 2017-04-02.
 */

import {IPromise, IService} from "restangular";
import {IArticle} from "./articleLoad";


/*@ngInject*/
export default class ArticleLoadService {
    constructor(private Restangular: IService) {

    }

    /**
     * 加载完数据到article
     * @param articleId 需要加载article的id
     * @returns {IPromise<IArticle> | null}
     */
    load(articleId: number): IPromise<IArticle> {
        let promise = this.Restangular.one("articles", articleId).get<IArticle>();
        return promise;
    }
}

