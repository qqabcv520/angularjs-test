/**
 * Created by 米饭 on 2017-03-31.
 */


import {IDocumentService, IPromise, IQService, IRootScopeService} from "angular";
import {ui} from "angular";
import IStateService = ui.IStateService;
import {animate} from "angular";
import IAnimateService = animate.IAnimateService;
import {translate} from "angular";
import ITranslateService = translate.ITranslateService;
import {INavbarConfig} from "./home";
import UserService from "../../commons/user/UserService";
import LangService from "../../commons/lang/LangService";

/*@ngInject*/
export default class HomeCtrl {

    private initState: boolean;//是否第一次加载，用于collapse的BUG


    isNavCollapsed: boolean;//collapse是否折叠
    isNavTransparent: boolean;//导航条是否透明
    isTop: boolean;//导航条是否透明

    constructor(private $rootScope: IRootScopeService,
                private $document: IDocumentService,
                private $q: IQService,
                private $translate: ITranslateService,
                private $animate: IAnimateService,
                private $state: IStateService,
                private navbar: INavbarConfig,
                private LangService: LangService,
                private UserService: UserService,) {

        this.initState = true;
        this.isNavCollapsed = true;
        this.isNavTransparent = true;
        this.isTop = true;


        $document.bind("scroll", () => {
            this.changeScrollTop();
            $rootScope.$apply();
        });

        $rootScope.$on("$locationChangeStart", () => {//路径变化时
            document.body.scrollTop = 0;
            this.isNavCollapsed = true;
            this.changeScrollTop();
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
        if (this.LangService.currentLang !== "en-us") {
            this.LangService.currentLang = "en-us";
        } else {
            this.LangService.currentLang = "zh-cn";
        }
        this.$translate.use(this.LangService.currentLang).then(() => this.$state.reload())
    }

    /**
     * 根据现在位置设置导航栏背景色
     */
    changeScrollTop(): void {

        let scrollTop = this.$document.scrollTop() || 0;

        if (scrollTop >= this.navbar.headerHeight && this.isNavTransparent) {
            this.isNavTransparent = false;
        } else if (scrollTop < this.navbar.headerHeight && !this.isNavTransparent) {
            this.isNavTransparent = true;
        }

        if (scrollTop >= 500 && this.isTop) {
            this.isTop = false;
        } else if (scrollTop < 500 && !this.isTop) {
            this.isTop = true;
        }
    }


    top(): void {
        this.$document.scrollTop(0);
    }
}