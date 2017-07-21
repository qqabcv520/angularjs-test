/**
 * Created by 米饭 on 2017-04-12.
 */


import {IDocumentService} from "angular";
import {IArticle} from "../../commons/articleLoad/articleLoad";
import {LoadState} from "../articleList/ArticleListService";
import {ICollectionPromise} from "restangular";
import TagLoadService from "../../commons/tagLoad/TagLoadService";
import {ui} from "angular";
import IStateParamsService = ui.IStateParamsService;
import {ITag} from "../../commons/tagLoad/tagLoad";

/*@ngInject*/
export default class TagArticleCtrl {

    tag: ITag;

    private _loadState: LoadState = LoadState.ready;
    private _page: number = 0;

    /**
     * 已加载的文章列表
     * @type {Array}
     */
    private _articles: Array<IArticle> = [];

    private _loader: TagLoadService;

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



    constructor($uibPosition: any,
                $document: IDocumentService,
                $stateParams: IStateParamsService,
                private TagLoadService: TagLoadService) {
        this.tag = {id: $stateParams.id, name: $stateParams.name};

        if(this._articles.length == 0) {//初始加载
            this.load();
        }

        let lastDate = 0;
        $document.bind('scroll', () => {
            let bottom = $uibPosition.viewportOffset(document.body).bottom;

            //限制加载频率
            let nowDate =  Date.now();
            if(bottom > -300 && nowDate-lastDate > 500 && this.loadState === LoadState.ready) {
                lastDate = nowDate;
                this.load();
            }
        });
    }

    load(): ICollectionPromise<IArticle> | null {
        if (this._loadState != LoadState.ready) {
            return null;
        }
        this._loadState = LoadState.loading;

        let promise = this.TagLoadService.loadArticleList(this.tag.id, {page: this.page, size: this.size});
        promise.then((result: Array<IArticle>) => {

            if (result.length === 0) {
                this._loadState = LoadState.over;
                return;
            }
            for (let article of result) {
                this._articles.push(article);
            }
            this._page += this.size;
            this._loadState = LoadState.ready;

        }).catch(() => {
            this._loadState = LoadState.ready;
        });
        return promise;
    }


    isLoadState(stateName: string): boolean {
        return stateName == LoadState[this.loadState];
    }
}

