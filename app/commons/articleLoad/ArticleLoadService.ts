/**
 * Created by 米饭 on 2017-04-02.
 */

import {ICollectionPromise, IPromise, IService} from "restangular";
import {IArticle} from "./articleLoad";


/*@ngInject*/
export default class ArticleLoadService {
    constructor(private Restangular: IService) {

    }

    /**
     * 加载完数据到article
     * @param articleId 需要加载article的id
     * @returns {IPromise<IArticle>}
     */
    load(articleId: number): IPromise<IArticle> {
        return this.Restangular.one("articles", articleId).get<IArticle>();
    }

    /**
     * 加载文章列表到articles
     * @returns {ICollectionPromise<IArticle> | null} 如果loadState为loading，则不会继续加载，返回null
     */
    loadList(param: {offset?: number, limit?: number, query?: string}): ICollectionPromise<IArticle> {
        return this.Restangular.all("articles").getList<IArticle>(param);
    }

    /**
     * 加载完数据到article
     * @param article 需要上传的article
     * @returns {IPromise<IArticle>}
     */
    upload(article: IArticle): IPromise<IArticle> {
        return this.Restangular.all("articles").post<IArticle>(article);
    }
}

