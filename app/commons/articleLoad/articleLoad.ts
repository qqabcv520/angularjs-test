/**
 * Created by 米饭 on 2017-04-03.
 */


import * as angular from "angular";
import ArticleLoadService from "./ArticleLoadService";
import ArticleListLoadService from "./ArticleListLoadService";

export default angular.module("articleLoad", ["restangular"])
    .service("ArticleListLoadService", ArticleListLoadService)
    .service("ArticleLoadService", ArticleLoadService)
    .name;





export interface IArticle {
    id: number;
    title: string;
    content: string;
    author: string;
    create: Date;
    reprintedFrom: string;
    clickCnt: number;
    outline: string;
    titleImg: string;
    tags: Array<string>;
}


// export interface ITag {
//     id: number;
//     name: string;
// }