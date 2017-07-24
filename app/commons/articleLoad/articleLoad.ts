/**
 * Created by 米饭 on 2017-04-03.
 */


import * as angular from "angular";
import ArticleLoadService from "./ArticleLoadService";
import {ITag} from "../tagLoad/tagLoad";

export default angular.module("articleLoad", ["restangular"])
    .service("ArticleLoadService", ArticleLoadService)
    .name;





export interface IArticle {
    id?: number;
    title: string;
    content: string;
    user?: string;
    createTime?: Date;
    reprintedFrom?: string;
    clickCnt?: number;
    outline?: string;
    titleImg?: string;
    tags?: Array<ITag>;
}


// export interface ITag {
//     id: number;
//     name: string;
// }