// /**
//  * Created by 米饭 on 2017-04-12.
//  */
//
//
// import {IArticle} from "../../commons/articleLoad/articleLoad";
// import {ICollectionPromise} from "restangular";
// import TagLoadService from "../../commons/tagLoad/TagLoadService";
//
//
// /*@ngInject*/
// export default class TagArticleService {
//     private _loadState: LoadState = LoadState.ready;
//     private _offset: number = 0;
//
//     /**
//      * 已加载的文章列表
//      * @type {Array}
//      */
//     private _articles: Array<IArticle> = [];
//
//     private _loader: TagLoadService;
//
//     /**
//      * 一次加载多少
//      * @type {number}
//      */
//     limit: number = 10;
//
//
//
//     /**
//      * 当前加载状态
//      * @returns {LoadState}
//      */
//     get loadState(): LoadState {
//         return this._loadState;
//     }
//
//     /**
//      * 已经加载到了多少
//      * @returns {number}
//      */
//     get offset(): number {
//         return this._offset;
//     }
//
//     /**
//      * 加载完后被装载数据的对象
//      */
//     get articles(): Array<IArticle> {
//         return this._articles;
//     }
//
//
//     constructor(ArticleLoadService: TagLoadService) {
//         this._loader = ArticleLoadService;
//     }
//
//     /**
//      *
//      * @returns {ICollectionPromise<IArticle> | null} 如果loadState为loading，则不会继续加载，返回null
//      */
//     load(): ICollectionPromise<IArticle> | null {
//         if (this._loadState != LoadState.ready) {
//             return null;
//         }
//         this._loadState = LoadState.loading;
//         let promise = this._loader.loadList({offset: this.offset, limit: this.limit});
//         promise.then((result: Array<IArticle>) => {
//
//             if (result.length === 0) {
//                 this._loadState = LoadState.over;
//                 return;
//             }
//             for (let article of result) {
//                 this._articles.push(article);
//             }
//             this._offset += this.limit;
//             this._loadState = LoadState.ready;
//
//         }).catch(() => {
//             this._loadState = LoadState.ready;
//         });
//         return promise;
//     }
//
//     // /**
//     //  * 回复初始
//     //  */
//     // init() {
//     //
//     // }
//
// }
//
//
//
// export enum LoadState{
//     ready, loading, over
// }
//
