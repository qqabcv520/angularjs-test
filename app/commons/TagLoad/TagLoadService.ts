/**
 * Created by 米饭 on 2017-04-04.
 */


import {IPromise, IService} from "restangular";
import {ITag} from "./tagLoad";

/*@ngInject*/
export default class TagLoadService {



    constructor(private Restangular: IService) {

    }

    /**
     *
     * @param tagId 需要加载tag的id
     * @returns {IPromise<ITag>}
     */
    load(tagId: number): IPromise<ITag> {
        return this.Restangular.one("tags", tagId).get<ITag>();;
    }

}
