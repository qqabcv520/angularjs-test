import ArticleLoadService from "../../commons/articleLoad/ArticleLoadService";
import {IArticle} from "../../commons/articleLoad/articleLoad";
import {ICollection, ICollectionPromise} from "restangular";

/*@ngInject*/
export default class ArticleListService {

    private _loadState: LoadState = LoadState.ready;
    private _page: number = 0;

    /**
     * 已加载的文章列表
     * @type {Array}
     */
    private _articles: Array<IArticle> = [];

    private _loader: ArticleLoadService;

    /**
     * 一次加载多少
     * @type {number}
     */
    size: number = 10;



    /**
     * 当前加载状态
     * @returns {LoadState}
     */
    get loadState(): LoadState {
        return this._loadState;
    }

    /**
     * 已经加载到了多少
     * @returns {number}
     */
    get page(): number {
        return this._page;
    }

    /**
     * 加载完后被装载数据的对象
     */
    get articles(): Array<IArticle> {
        return this._articles;
    }


    constructor(ArticleLoadService: ArticleLoadService) {
        this._loader = ArticleLoadService;
    }

    /**
     *
     * @returns {ICollectionPromise<IArticle> | null} 如果loadState为loading，则不会继续加载，返回null
     */
    load(): ICollectionPromise<IArticle> | null {
        if (this._loadState != LoadState.ready) {
            return null;
        }
        this._loadState = LoadState.loading;
        let promise = this._loader.loadList({page: this.page, size: this.size});
        promise.then((result: Array<IArticle>) => {
            if (result.length === 0) {
                this._loadState = LoadState.over;
                return;
            }
            for (let article of result) {
                this._articles.push(article);
            }
            this._page++;
            this._loadState = LoadState.ready;

        }).catch(() => {
            this._loadState = LoadState.ready;
        });
        return promise;
    }

    // /**
    //  * 回复初始
    //  */
    // init() {
    //
    // }
}

export enum LoadState{
    ready, loading, over
}

