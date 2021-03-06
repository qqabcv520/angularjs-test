/**
 * Created by 米饭 on 2017-04-04.
 */

import TagLoadService from "./TagLoadService";
import * as angular from "angular";

export default angular.module("tagLoad", ["restangular"])
    .service("TagLoadService", TagLoadService)
    .name;




export interface ITag {
    id?: number;
    name: string;
}