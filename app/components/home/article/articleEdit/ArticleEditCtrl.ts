/**
 * Created by 米饭 on 2017-04-01.
 */


/*@ngInject*/
export default class ArticleEditCtrl {

    tags;

    constructor(Restangular) {

        Restangular.one("tags").get().then((result) => {
            this.tags = result;
        }, function (err) {
            console.error('加载tagList错误:' + err);
        });
    }

    static tagging(tag) {
        return {name: tag};
    }
}
