/**
 * Created by 米饭 on 2017-03-31.
 */


import {IDocumentService, IPromise, IQService, IRootScopeService} from "angular";
import {IStateService} from "@types/angular-ui-router";
import {translate} from "angular";
import ITranslateService = translate.ITranslateService;

/*@ngInject*/
export default class HomeCtrl {

    private initState: boolean;//是否第一次加载，用于collapse的BUG


    isNavCollapsed: boolean;//collapse是否折叠
    isNavTransparent: boolean;//导航条是否透明

    /**
     *
     * @param $rootScope
     * @param $document
     * @param $q
     * @param $translate
     * @param $state
     * @param navbar 导航条透明位置
     */
    constructor(private $rootScope: IRootScopeService,
                private $document: IDocumentService,
                private $q: IQService,
                private $translate: ITranslateService,
                private $state: IStateService,
                private navbar) {

        this.initState = true;
        this.isNavCollapsed = true;
        this.isNavTransparent = false;


        this.isNavTransparent = document.body.scrollTop < navbar.headerHeight;

        $document.bind("scroll", () => {
            this.changeNavBg();
            $rootScope.$apply();
        });

        $rootScope.$on("$locationChangeStart", () => {//路径变化时
            this.isNavCollapsed = true;
            this.changeNavBg();
        });

    }

    /**
     * collapse初始会自动执行一次，不知道啥原因，把自动执行的停止
     * @returns {IPromise<{}>}
     */
    private isInit(): IPromise<{}> | void {
        if (this.initState) {     //禁止执行
            let deferred = this.$q.defer();
            deferred.reject();
            this.initState = false;
            return deferred.promise;
        }
    }

    /**
     * 切换语言
     */
    switchLang(): void {
        if (this.$rootScope.currentLang !== "en-us") {
            this.$rootScope.currentLang = "en-us";
        } else {
            this.$rootScope.currentLang = "zh-cn";
        }
        this.$translate.use(this.$rootScope.currentLang).then(() => this.$state.reload())
    }

    /**
     * 根据现在位置设置导航栏背景色
     */
    changeNavBg(): void {

        if (this.$document.scrollTop() >= this.navbar.headerHeight && this.isNavTransparent) {
            this.isNavTransparent = false;
        } else if (this.$document.scrollTop() < this.navbar.headerHeight && !this.isNavTransparent) {
            this.isNavTransparent = true;
        }
    }
}