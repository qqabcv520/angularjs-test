/**
 * Created by 米饭 on 2017-04-02.
 */

import {IArticle, LoadState} from "../../../../commons/ArticleLoad/articleLoad";
import ArticleListLoadService from "../../../../commons/ArticleLoad/ArticleListLoadService";
import {IDocumentService} from "angular";



/*@ngInject*/
export default class ArticleListCtrl {

    loader: ArticleListLoadService;


    constructor($uibPosition, $document: IDocumentService, ArticleListLoadService: ArticleListLoadService) {
        this.loader = ArticleListLoadService;
        this.loader.load();

        let lastDate = 0;
        $document.bind('scroll', () => {
            let bottom = $uibPosition.viewportOffset(document.body).bottom;

            //限制加载频率
            let nowDate =  Date.now();
            if(bottom > -300 && nowDate-lastDate > 500 && this.loader.loadState === LoadState.ready) {
                lastDate = nowDate;
                this.loader.load();
            }
        });
    }
}



