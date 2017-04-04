/**
 * Created by 米饭 on 2017-04-02.
 */

import {IPromise, IService} from "restangular";
import {IArticle, LoadState} from "./articleLoad";
import {ISCEService} from "angular";



/*@ngInject*/
export default class ArticleLoadService {


    private mLoadState: LoadState = LoadState.ready;

    /**
     * 加载完后被装载数据的对象
     */
    article: IArticle;


    constructor(private Restangular: IService, private $sce: ISCEService) {

    }

    /**
     *
     * @param articleId 需要加载article的id
     * @returns {IPromise<IArticle>}
     */
    load(articleId: number): IPromise<IArticle> {
        let promise =  this.Restangular.one("articles", articleId).get<IArticle>();
        promise.then((result: IArticle) => {
            this.article = result;
            this.article.content = this.$sce.trustAsHtml(this.article.content);

        }).catch((err) => {
            console.error('加载articleDetail错误:' + err);
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

}

