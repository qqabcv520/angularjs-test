/**
 * Created by 米饭 on 2017-04-04.
 */


import {IPromise, IService} from "restangular";
import {ITag} from "./tagLoad";

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
        return this.Restangular.one("tags", tagId).get<ITag>();;
    }

    /**
     * 加载tags
     * @param param {query, offset, limit}
     * @returns {ICollectionPromise<ITag>}
     */
    loadList(param?: {query?: string, offset?: number, limit?: number}): IPromise<Array<ITag>> {
        return this.Restangular.all("tags").getList<ITag>(param);
    }

    /**
     * 加载tag包含的文章
     * @param tagId
     * @param param {query, offset, limit}
     * @returns {ICollectionPromise<ITag>}
     */
    loadArticleList(tagId: number, param?: {query?: string, offset?: number, limit?: number}): IPromise<Array<ITag>> {
        return this.Restangular.one("tags", tagId).all("articles").getList<ITag>(param);
    }
}
