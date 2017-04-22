/**
 * Created by 米饭 on 2017-04-12.
 */


import {IDocumentService} from "angular";
import TagArticleService from "./TagArticleService";
import {IArticle} from "../../commons/articleLoad/articleLoad";

/*@ngInject*/
export default class TagArticleCtrl {
    //
    // articles: Array<IArticle>;
    //
    //
    // constructor($uibPosition: any, $document: IDocumentService, TagArticleService: TagArticleService) {
    //     if(TagArticleService.articles.length == 0) {//初始加载
    //         this.articles = TagArticleService.load();
    //     }
    //
    //     let lastDate = 0;
    //     $document.bind('scroll', () => {
    //         let bottom = $uibPosition.viewportOffset(document.body).bottom;
    //
    //         //限制加载频率
    //         let nowDate =  Date.now();
    //         if(bottom > -300 && nowDate-lastDate > 500 && this.loader.loadState === LoadState.ready) {
    //             lastDate = nowDate;
    //             this.loader.load();
    //         }
    //     });
    // }
    //
    //
    // isLoadState(stateName: string): boolean {
    //     return stateName == LoadState[this.loader.loadState];
    // }
}

