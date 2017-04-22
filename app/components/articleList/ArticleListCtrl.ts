/**
 * Created by 米饭 on 2017-04-02.
 */

import {IDocumentService} from "angular";
import ArticleListService, {LoadState} from "./ArticleListService";
import {IArticle} from "../../commons/articleLoad/articleLoad";



/*@ngInject*/
export default class ArticleListCtrl {


    private _articles: Array<IArticle>;

    /**
     * 已加载的文章列表
     * @returns {Array<IArticle>}
     */
    get articles(): Array<IArticle> {
        return this._articles;
    }

    constructor($uibPosition: any, $document: IDocumentService, private ArticleListService: ArticleListService) {
        this._articles = ArticleListService.articles;

        if(this._articles.length == 0) {//初始加载
            ArticleListService.load();
        }

        let lastDate = 0;
        $document.bind('scroll', () => {
            let bottom = $uibPosition.viewportOffset(document.body).bottom;
            //限制加载频率
            let nowDate =  Date.now();
            if(bottom > -300 && nowDate-lastDate > 500) {
                lastDate = nowDate;
                ArticleListService.load();
            }
        });
    }


    isLoadState(stateName: string): boolean {
        return stateName == LoadState[this.ArticleListService.loadState];
    }
}



