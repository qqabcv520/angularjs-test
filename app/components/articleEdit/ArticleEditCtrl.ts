/**
 * Created by 米饭 on 2017-04-01.
 */

import TagListLoadService from "../../commons/tagLoad/TagListLoadService";
import {ISCEService} from "angular";

/*@ngInject*/
export default class ArticleEditCtrl {

    loader: TagListLoadService;

    constructor(private $sce: ISCEService, TagListLoadService: TagListLoadService) {
        this.loader = TagListLoadService;
        TagListLoadService.load();
    }

    tagging(tag: string): { name: string } {
        return {name: tag};
    }
}
