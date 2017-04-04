/**
 * Created by 米饭 on 2017-04-02.
 */

import {ICollectionPromise, IService} from "restangular";
import {IArticle, LoadState} from "./articleLoad";



/*@ngInject*/
export default class ArticleListLoadService {


    private mLoadState: LoadState = LoadState.ready;
    private mOffset: number = 0;
    /**
     * 一次加载多少
     * @type {number}
     */
    limit = 10;

    /**
     * 已加载的文章列表
     * @type {Array}
     */
    articles: Array<IArticle> = [];


    constructor(private Restangular: IService) {

    }


    /**
     * 加载文章列表到articles
     * @returns {ICollectionPromise<IArticle>} 如果loadState为loading，则不会继续加载，返回null
     */
    load(): ICollectionPromise<IArticle> | null {
        if(this.mLoadState != LoadState.ready) {
            return null;
        }
        this.mLoadState = LoadState.loading;
        let promise = this.Restangular.all("articles").getList<IArticle>({offset: this.offset, limit: this.limit});
        promise.then((result: Array<IArticle>) => {

            if(result.length === 0) {
                this.mLoadState = LoadState.over;
                return;
            }
            for(let article of result) {
                this.articles.push(article);
            }
            this.mOffset += this.limit;
            this.mLoadState = LoadState.ready;

        }).catch((err) => {
            this.mLoadState = LoadState.ready;
            console.error("加载articleList错误:" + err);
        });
        return promise;
    }

    /**
     * 当前加载状态
     * @returns {LoadState}
     */
    get loadState(): LoadState {
        return this.mLoadState;
    }

    /**
     * 已经加载到了多少
     * @returns {number}
     */
    get offset(): number {
        return this.mOffset;
    }

}




