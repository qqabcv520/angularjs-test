/**
 * Created by 米饭 on 2017-04-01.
 */

import {ITag} from "../../commons/tagLoad/tagLoad";
import {IArticle} from "../../commons/articleLoad/articleLoad";
import TagLoadService from "../../commons/tagLoad/TagLoadService";
import ArticleLoadService from "../../commons/articleLoad/ArticleLoadService";

/*@ngInject*/
export default class ArticleEditCtrl {

    tags: Array<ITag>;
    article: IArticle;
    selectedTags: Array<ITag>;
    constructor(private ArticleLoadService: ArticleLoadService, TagLoadService: TagLoadService) {
        this.tags = TagLoadService.loadList().$object;
        this.article = {
            content: "<p><br></p>",
            title: "",
            outline: ""
        };
    }

    tagging(tag: string): { name: string } {
        return {name: tag};
    }

    submit() {
        this.article.tags = this.selectedTags.map<ITag>(
            (value) => {
                return {name: value.name};
            }
        );


        this.ArticleLoadService.upload(this.article);
    }

}
