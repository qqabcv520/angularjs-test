/**
 * Created by 米饭 on 2017-04-04.
 */


import {ICollectionPromise, IPromise, IService} from "restangular";
import {ITag} from "./tagLoad";
import {IArticle} from "../articleLoad/articleLoad";

/*@ngInject*/
export default class TagLoadService {



    constructor(private Restangular: IService) {

    }

    /**
     *
     * @param tagId 需要加载tag的id
     * @returns {IPromise<ITag>}
     */
    load(tagId: number): IPromise<ITag> {
        return this.Restangular.one("tags", tagId).get<ITag>();
    }

    /**
     * 加载tags
     * @param param {query, offset, size}
     * @returns {ICollectionPromise<ITag>}
     */
    loadList(param?: {query?: string, page?: number, size?: number}): ICollectionPromise<ITag> {
        return this.Restangular.all("tags").getList<ITag>(param);
    }

    /**
     * 加载tag包含的文章
     * @param tagId
     * @param param {query, offset, size}
     * @returns {ICollectionPromise<IArticle>}
     */
    loadArticleList(tagId: number|undefined, param?: {query?: string, page?: number, size?: number}): ICollectionPromise<IArticle> {
        return this.Restangular.one("tags", tagId).all("articles").getList<IArticle>(param);
    }
}
