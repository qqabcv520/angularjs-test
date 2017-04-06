/**
 * Created by 米饭 on 2017-04-04.
 */


import {IPromise, IService} from "restangular";
import {ITag} from "./tagLoad";

/*@ngInject*/
export default class TagListLoadService {


    constructor(private Restangular: IService) {

    }

    /**
     * 加载tags
     * @param param
     * @returns {IPromise<ITag>}
     */
    load(param?: ITagListParam): IPromise<Array<ITag>> {
        return this.Restangular.all("tags").getList<ITag>(param);
    }
}


export interface ITagListParam {
    query?: string;
    offset?: number;
    limit?: number;
}