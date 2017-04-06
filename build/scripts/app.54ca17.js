webpackJsonp([0],{

/***/ "3DGO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
* Created by 米饭 on 2017-03-15.
*/

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var token_1 = __webpack_require__("Rbw7");
var LoginCtrl_1 = __webpack_require__("WUSD");
exports.default = angular.module('login', ['restangular', token_1.default])
    .controller('LoginCtrl', LoginCtrl_1.default)
    .name;


/***/ }),

/***/ "3QxU":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\"\r\n     ng-class=\"{'navbar-transparent':vm.isNavTransparent, 'navbar-default':!vm.isNavTransparent}\"\r\n     role=\"navigation\">\r\n    <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\"\r\n                ng-click=\"vm.isNavCollapsed = !vm.isNavCollapsed\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" ui-sref=\".articleList\" translate>米饭博客</a>\r\n    </div>\r\n    <div class=\"collapse navbar-collapse\" uib-collapse=\"vm.isNavCollapsed\" collapsing=\"vm.isInit()\">\r\n        <ul class=\"nav navbar-nav\">\r\n            <li class=\"active\" ui-sref-active=\"active\">\r\n                <a ui-sref=\".articleList\" translate>文章</a>\r\n            </li>\r\n            <li ui-sref-active=\"active\">\r\n                <a ui-sref=\".tagList\" translate>话题</a>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <li >\r\n                <a ui-sref=\".articleEdit\" translate>发布</a>\r\n            </li>\r\n            <li >\r\n                <a ui-sref=\".login\" translate>登录</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>\r\n\r\n<div ui-view class=\"home-content\"></div>\r\n\r\n<footer class=\"main-footer\">\r\n    <!--<div class=\"friend-links\">-->\r\n        <!--<div class=\"container\">-->\r\n            <!--<div class=\"row\">-->\r\n                <!--<div class=\"col-xs-12\">-->\r\n                    <!--<div class=\"title\">-->\r\n                        <!--<h4 translate>友情链接</h4>-->\r\n                    <!--</div>-->\r\n                <!--</div>-->\r\n            <!--</div>-->\r\n\r\n            <!--<div class=\"row\">-->\r\n                <!--<div class=\"col-sm-4\">-->\r\n                    <!--<ul class=\"group\">-->\r\n                        <!--<li><a href=\"#\" title=\"\">综合业务平台</a></li>-->\r\n                        <!--<li><a href=\"#\" title=\"\">教务信息</a></li>-->\r\n                    <!--</ul>-->\r\n                <!--</div>-->\r\n                <!--<div class=\"col-sm-4\">-->\r\n                    <!--<ul class=\"group\">-->\r\n                        <!--<li><a href=\"#\" title=\"\">校园门户</a></li>-->\r\n                        <!--<li><a href=\"#\" title=\"\">协同办公</a></li>-->\r\n                    <!--</ul>-->\r\n                <!--</div>-->\r\n                <!--<div class=\"col-sm-4\">-->\r\n                    <!--<ul class=\"group\">-->\r\n                        <!--<li><a href=\"#\" title=\"\">综合业务平台</a></li>-->\r\n                        <!--<li><a href=\"#\" title=\"\">教务信息</a></li>-->\r\n                    <!--</ul>-->\r\n                <!--</div>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n    <!--</div>-->\r\n    <div class=\"copyright\">\r\n        <span>Copyright &copy; 2017 <span translate>米饭博客</span></span>\r\n        |\r\n        <span>\r\n            <a href=\"\" target=\"_blank\">[<span translate>后台管理</span>]</a>\r\n        </span>\r\n        |\r\n        <span>\r\n            <a href=\"\" ng-click=\"vm.switchLang()\">[<span translate>English</span>]</a>\r\n        </span>\r\n    </div>\r\n</footer>";

/***/ }),

/***/ "44Ju":
/***/ (function(module, exports) {

module.exports = "<div class=\"tag-list\">\r\n    <header class=\"jumbotron jumbotron-header\">\r\n        <h1 translate>话题</h1>\r\n    </header>\r\n\r\n    <div class=\"container content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"panel panel-tag\">\r\n                    <div class=\"panel-heading\">\r\n                        <span class=\"tag-title\">A</span>\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Ajax</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Android</a>\r\n                        <a href=\"\" class=\"label label-transparent\">App</a>\r\n                        <a href=\"\" class=\"label label-transparent\">阿里巴巴</a>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel panel-tag\">\r\n                    <div class=\"panel-heading\">\r\n                        <span class=\"tag-title\">B</span>\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <a href=\"\" class=\"label label-transparent\">Bootstrap</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Bower</a>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"panel panel-tag\">\r\n                    <div class=\"panel-heading\">\r\n                        <span class=\"tag-title\">B</span>\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>";

/***/ }),

/***/ "5+rP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-05.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var TokenService = (function () {
    TokenService.$inject = ["Restangular", "localStorageService"];
    function TokenService(Restangular, localStorageService) {
        this.Restangular = Restangular;
        this.localStorageService = localStorageService;
        this.token = this.localStorageService.get("token");
    }
    /**
     * 提交username和password，从服务端获取token
     * @param loginParam
     */
    TokenService.prototype.login = function (loginParam) {
        var _this = this;
        this.Restangular.all("users").customPOST(loginParam, "token").then(function (result) {
            _this.token = result.token;
        }, function (err) {
            console.error("登录失败:" + err.state);
        });
    };
    Object.defineProperty(TokenService.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (value) {
            this._token = value;
            this.Restangular.setDefaultHeaders({ token: value });
            this.localStorageService.set("token", value);
        },
        enumerable: true,
        configurable: true
    });
    return TokenService;
}());
exports.default = TokenService;


/***/ }),

/***/ "8rGx":
/***/ (function(module, exports) {

module.exports = "<div class=\"article-edit\">\r\n    <header class=\"jumbotron jumbotron-header\" >\r\n        <h1 ></h1>\r\n    </header>\r\n\r\n    <div class=\"container-fluid content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2\">\r\n                <div class=\"editor-article\" data-ng-model=\"editorContent\" content-editable >\r\n                </div>\r\n\r\n                <ui-select  class=\"tag-select\" ng-model=\"selected.value\" theme=\"bootstrap\" multiple limit=\"5\" tagging=\"vm.tagging\" tagging-label=\"（新建）\">\r\n                    <ui-select-match placeholder=\"{{'最多选择五项'|translate}}\">\r\n                        <span ng-bind=\"$item.name\"></span>\r\n                    </ui-select-match>\r\n                    <ui-select-choices repeat=\"tag in vm.loader.tags | filter: $select.search\">\r\n                        <span ng-if=\"!tag.isTag\" ng-bind-html=\"vm.$sce.trustAsHtml(tag.name) | highlight: $select.search\"></span>\r\n                        <span ng-if=\"tag.isTag\" ng-bind-html=\"vm.$sce.trustAsHtml(tag.name)+$select.taggingLabel\"></span>\r\n                    </ui-select-choices>\r\n                </ui-select>\r\n\r\n                <button class=\"btn btn-main submit-article\" translate>提交文章</button>\r\n                <button class=\"btn btn-default submit-article\" translate>预览文章</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n";

/***/ }),

/***/ "9EJZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-06.
 */

langConfig.$inject = ["$translateProvider"];
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("cw+6");
__webpack_require__("qtjg");
/*@ngInject*/
function langConfig($translateProvider) {
    $translateProvider.preferredLanguage('zh-cn'); //语言
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters'); //设置HTML转义策略,在有参数时清除
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
}
exports.default = langConfig;


/***/ }),

/***/ "9EYe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-31.
 */

appConfig.$inject = ["RestangularProvider"];
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function appConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://192.168.1.130:8080/myblog');
}
exports.default = appConfig;


/***/ }),

/***/ "AxpV":
/***/ (function(module, exports) {

module.exports = "<div class=\"article-list\">\r\n    <header class=\"jumbotron jumbotron-header\">\r\n        <h1 >Hello, world!</h1>\r\n    </header>\r\n\r\n    <div class=\"container-fluid content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2\">\r\n                <div class=\"panel panel-article\" ng-repeat=\"article in vm.loader.articles\">\r\n                    <div class=\"panel-heading\">\r\n                        <h3 class=\"article-title\">\r\n                            <a ui-sref=\"home.articleDetail({articleId:article.id})\" ng-bind=\"article.title\"></a>\r\n                        </h3>\r\n                    </div>\r\n                    <div class=\"panel-body\" ng-bind=\"article.outline\"></div>\r\n                    <div class=\"panel-tag\">\r\n                        <div class=\"article-tag pull-left\">\r\n                            <span class=\"glyphicon glyphicon-tag\" aria-hidden=\"true\"></span>\r\n                            <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                            <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                            <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                            <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                            <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                            <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                            <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                            <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                        </div>\r\n                        <span class=\"article-info pull-right\">\r\n\t\t\t\t\t\t<span>米饭</span>\r\n\t\t\t\t\t\t<span>2017-03-03</span>\r\n\t\t\t\t\t</span>\r\n                        <div class=\"clearfix\"></div>\r\n                    </div>\r\n                </div>\r\n                <div ng-if=\"vm.loader.loadState=='loading'\" class=\"panel-loading\">加载中……</div>\r\n                <div ng-if=\"vm.loader.loadState=='over'\" class=\"panel-loading\">没有更多了</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "DCZT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-02.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var ArticleListLoadService = (function () {
    ArticleListLoadService.$inject = ["Restangular"];
    function ArticleListLoadService(Restangular) {
        this.Restangular = Restangular;
        this._loadState = LoadState.ready;
        this._offset = 0;
        /**
         * 一次加载多少
         * @type {number}
         */
        this.limit = 10;
        /**
         * 已加载的文章列表
         * @type {Array}
         */
        this._articles = [];
    }
    /**
     * 加载文章列表到articles
     * @returns {ICollectionPromise<IArticle> | null} 如果loadState为loading，则不会继续加载，返回null
     */
    ArticleListLoadService.prototype.load = function () {
        var _this = this;
        if (this._loadState != LoadState.ready) {
            return null;
        }
        this._loadState = LoadState.loading;
        var promise = this.Restangular.all("articles").getList({ offset: this.offset, limit: this.limit });
        promise.then(function (result) {
            if (result.length === 0) {
                _this._loadState = LoadState.over;
                return;
            }
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var article = result_1[_i];
                _this._articles.push(article);
            }
            _this._offset += _this.limit;
            _this._loadState = LoadState.ready;
        }).catch(function (err) {
            _this._loadState = LoadState.ready;
            console.error("加载articleList错误:" + err);
        });
        return promise;
    };
    Object.defineProperty(ArticleListLoadService.prototype, "loadState", {
        /**
         * 当前加载状态
         * @returns {LoadState}
         */
        get: function () {
            return this._loadState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArticleListLoadService.prototype, "offset", {
        /**
         * 已经加载到了多少
         * @returns {number}
         */
        get: function () {
            return this._offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArticleListLoadService.prototype, "articles", {
        /**
         * 加载完后被装载数据的对象，初始化时会
         */
        get: function () {
            return this._articles;
        },
        enumerable: true,
        configurable: true
    });
    return ArticleListLoadService;
}());
exports.default = ArticleListLoadService;
var LoadState;
(function (LoadState) {
    LoadState[LoadState["ready"] = 0] = "ready";
    LoadState[LoadState["loading"] = 1] = "loading";
    LoadState[LoadState["over"] = 2] = "over";
})(LoadState = exports.LoadState || (exports.LoadState = {}));


/***/ }),

/***/ "Hk9o":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-04.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var TagLoadService_1 = __webpack_require__("ofEa");
var angular = __webpack_require__(0);
var TagListLoadService_1 = __webpack_require__("R4bC");
exports.default = angular.module("tagLoad", ["restangular"])
    .service("TagLoadService", TagLoadService_1.default)
    .service("TagListLoadService", TagListLoadService_1.default)
    .name;


/***/ }),

/***/ "LaJp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-07.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var login_1 = __webpack_require__("3DGO");
var articleList_1 = __webpack_require__("VsKk");
var articleEdit_1 = __webpack_require__("j09m");
var articleDetail_1 = __webpack_require__("zoLL");
var HomeCtrl_1 = __webpack_require__("W6eL");
var homeRoute_1 = __webpack_require__("bnjO");
exports.default = angular.module('home', ['ngAnimate', 'ui.bootstrap', 'ui.router', login_1.default, articleList_1.default, articleEdit_1.default, articleDetail_1.default])
    .controller('HomeCtrl', HomeCtrl_1.default)
    .config(homeRoute_1.default)
    .value('navbar', { headerHeight: 350 })
    .name;


/***/ }),

/***/ "M8pp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-05.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var LangService = (function () {
    LangService.$inject = ["localStorageService", "$translate"];
    function LangService(localStorageService, $translate) {
        this.localStorageService = localStorageService;
        this.$translate = $translate;
        this.currentLang = localStorageService.get('currentLang') || 'zh-cn';
    }
    Object.defineProperty(LangService.prototype, "currentLang", {
        get: function () {
            return this._currentLang;
        },
        set: function (value) {
            this._currentLang = value;
            this.localStorageService.set('currentLang', value);
            this.$translate.use(this._currentLang);
        },
        enumerable: true,
        configurable: true
    });
    return LangService;
}());
exports.default = LangService;


/***/ }),

/***/ "R4bC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-04.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var TagListLoadService = (function () {
    TagListLoadService.$inject = ["Restangular"];
    function TagListLoadService(Restangular) {
        this.Restangular = Restangular;
    }
    /**
     * 加载tags
     * @param param
     * @returns {IPromise<ITag>}
     */
    TagListLoadService.prototype.load = function (param) {
        return this.Restangular.all("tags").getList(param);
    };
    return TagListLoadService;
}());
exports.default = TagListLoadService;


/***/ }),

/***/ "RX+t":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-02.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var ArticleLoadService = (function () {
    ArticleLoadService.$inject = ["Restangular"];
    function ArticleLoadService(Restangular) {
        this.Restangular = Restangular;
    }
    /**
     * 加载完数据到article
     * @param articleId 需要加载article的id
     * @returns {IPromise<IArticle> | null}
     */
    ArticleLoadService.prototype.load = function (articleId) {
        var promise = this.Restangular.one("articles", articleId).get();
        return promise;
    };
    return ArticleLoadService;
}());
exports.default = ArticleLoadService;


/***/ }),

/***/ "Rbw7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-05.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var TokenService_1 = __webpack_require__("5+rP");
exports.default = angular.module("token", ["restangular", "LocalStorageModule"])
    .service("TokenService", TokenService_1.default)
    .name;


/***/ }),

/***/ "VsKk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-08.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ArticleListCtrl_1 = __webpack_require__("ynnM");
var articleLoad_1 = __webpack_require__("mFEl");
exports.default = angular.module('articleList', ['ui.bootstrap', 'restangular', articleLoad_1.default])
    .controller('ArticleListCtrl', ArticleListCtrl_1.default)
    .name;


/***/ }),

/***/ "W6eL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-31.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var HomeCtrl = (function () {
    /**
     *
     * @param $rootScope
     * @param $document
     * @param $q
     * @param $translate
     * @param $state
     * @param navbar 导航条透明位置
     */
    HomeCtrl.$inject = ["$rootScope", "$document", "$q", "$translate", "$state", "navbar"];
    function HomeCtrl($rootScope, $document, $q, $translate, $state, navbar) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$document = $document;
        this.$q = $q;
        this.$translate = $translate;
        this.$state = $state;
        this.navbar = navbar;
        this.initState = true;
        this.isNavCollapsed = true;
        this.isNavTransparent = false;
        this.isNavTransparent = document.body.scrollTop < navbar.headerHeight;
        $document.bind("scroll", function () {
            _this.changeNavBg();
            $rootScope.$apply();
        });
        $rootScope.$on("$locationChangeStart", function () {
            _this.isNavCollapsed = true;
            _this.changeNavBg();
        });
    }
    /**
     * collapse初始会自动执行一次，不知道啥原因，把自动执行的停止
     * @returns {IPromise<{}>}
     */
    HomeCtrl.prototype.isInit = function () {
        if (this.initState) {
            var deferred = this.$q.defer();
            deferred.reject();
            this.initState = false;
            return deferred.promise;
        }
    };
    /**
     * 切换语言
     */
    HomeCtrl.prototype.switchLang = function () {
        var _this = this;
        if (this.$rootScope.currentLang !== "en-us") {
            this.$rootScope.currentLang = "en-us";
        }
        else {
            this.$rootScope.currentLang = "zh-cn";
        }
        this.$translate.use(this.$rootScope.currentLang).then(function () { return _this.$state.reload(); });
    };
    /**
     * 根据现在位置设置导航栏背景色
     */
    HomeCtrl.prototype.changeNavBg = function () {
        if (this.$document.scrollTop() >= this.navbar.headerHeight && this.isNavTransparent) {
            this.isNavTransparent = false;
        }
        else if (this.$document.scrollTop() < this.navbar.headerHeight && !this.isNavTransparent) {
            this.isNavTransparent = true;
        }
    };
    return HomeCtrl;
}());
exports.default = HomeCtrl;


/***/ }),

/***/ "WUSD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-04.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var LoginCtrl = (function () {
    LoginCtrl.$inject = ["TokenService"];
    function LoginCtrl(TokenService) {
        this.TokenService = TokenService;
    }
    LoginCtrl.prototype.submit = function (loginParam) {
        console.log(loginParam);
        this.TokenService.login(loginParam);
    };
    return LoginCtrl;
}());
exports.default = LoginCtrl;


/***/ }),

/***/ "ba2E":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-31.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function appRun() {
}
exports.default = appRun;


/***/ }),

/***/ "bnjO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-06.
 */

appRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
Object.defineProperty(exports, "__esModule", { value: true });
var articleListHtml = __webpack_require__("AxpV");
var articleDetailHtml = __webpack_require__("ukWT");
var articleEditHtml = __webpack_require__("8rGx");
var tagListHtml = __webpack_require__("44Ju");
var loginHtml = __webpack_require__("zGP0");
/*@ngInject*/
function appRoute($stateProvider, $urlRouterProvider) {
    enterLogin.$inject = ["navbar"];
    exitLogin.$inject = ["navbar"];
    $urlRouterProvider.when('/home', '/home/articleList');
    $stateProvider
        .state('home.articleList', {
        url: '/articleList',
        template: articleListHtml,
        controller: 'ArticleListCtrl',
        controllerAs: 'vm'
    })
        .state('home.articleDetail', {
        url: '/articleDetail/{articleId:[0-9]{1,6}}',
        template: articleDetailHtml,
        controller: 'ArticleDetailCtrl',
        controllerAs: 'vm'
    })
        .state('home.articleEdit', {
        url: '/articleEdit',
        template: articleEditHtml,
        controller: 'ArticleEditCtrl',
        controllerAs: 'vm'
    })
        .state('home.tagList', {
        url: '/tagList',
        template: tagListHtml
        // controller: 'TagListCtrl'
    })
        .state('home.login', {
        url: '/login',
        template: loginHtml,
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        onEnter: enterLogin,
        onExit: exitLogin
    });
    /*@ngInject*/
    function enterLogin(navbar) {
        navbar.headerHeight = -10000; //永不透明
    }
    /*@ngInject*/
    function exitLogin(navbar) {
        navbar.headerHeight = 350;
    }
}
exports.default = appRoute;


/***/ }),

/***/ "cw+6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/languages/zh-cn.json";

/***/ }),

/***/ "dPdT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 米饭 on 2017-04-05.
 */
var angular = __webpack_require__(0);
var LangService_1 = __webpack_require__("M8pp");
var langConfig_1 = __webpack_require__("9EJZ");
exports.default = angular.module("lang", ["LocalStorageModule"])
    .service("LangService", LangService_1.default)
    .config(langConfig_1.default)
    .name;


/***/ }),

/***/ "hM64":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-05.
 */

appRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
Object.defineProperty(exports, "__esModule", { value: true });
var homeHtml = __webpack_require__("3QxU");
var articleListHtml = __webpack_require__("AxpV");
var articleDetailHtml = __webpack_require__("ukWT");
var articleEditHtml = __webpack_require__("8rGx");
var tagListHtml = __webpack_require__("44Ju");
var loginHtml = __webpack_require__("zGP0");
/*@ngInject*/
function appRoute($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
        url: '/home',
        template: homeHtml,
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        abstract: true
    });
}
exports.default = appRoute;


/***/ }),

/***/ "j09m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-17.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ArticleEditCtrl_1 = __webpack_require__("s9oi");
var wangEditorDirective_1 = __webpack_require__("eZkf");
var tagLoad_1 = __webpack_require__("Hk9o");
exports.default = angular.module('articleEdit', ['ui.select', 'ngSanitize', wangEditorDirective_1.default, tagLoad_1.default])
    .controller('ArticleEditCtrl', ArticleEditCtrl_1.default)
    .name;
function cfg($) {
}


/***/ }),

/***/ "j7YV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-01.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var ArticleDetailCtrl = (function () {
    ArticleDetailCtrl.$inject = ["$sce", "$stateParams", "ArticleLoadService"];
    function ArticleDetailCtrl($sce, $stateParams, ArticleLoadService) {
        this.$sce = $sce;
        this.article = ArticleLoadService.load($stateParams.articleId).$object;
    }
    return ArticleDetailCtrl;
}());
exports.default = ArticleDetailCtrl;


/***/ }),

/***/ "l04R":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "m2IE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-05.
 */

Object.defineProperty(exports, "__esModule", { value: true });
// import "../../node_modules/bootstrap/less/bootstrap.less"
__webpack_require__("l04R");
var angular = __webpack_require__(0);
var home_1 = __webpack_require__("LaJp");
var token_1 = __webpack_require__("Rbw7");
var lang_1 = __webpack_require__("dPdT");
var appConfig_1 = __webpack_require__("9EYe");
var appRoute_1 = __webpack_require__("hM64");
var appRun_1 = __webpack_require__("ba2E");
angular.module("myApp", ["pascalprecht.translate", "restangular", "ui.router", lang_1.default, token_1.default, home_1.default])
    .config(appConfig_1.default)
    .config(appRoute_1.default)
    .run(appRun_1.default);


/***/ }),

/***/ "mFEl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-03.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ArticleLoadService_1 = __webpack_require__("RX+t");
var ArticleListLoadService_1 = __webpack_require__("DCZT");
exports.default = angular.module("articleLoad", ["restangular"])
    .service("ArticleListLoadService", ArticleListLoadService_1.default)
    .service("ArticleLoadService", ArticleLoadService_1.default)
    .name;
// export interface ITag {
//     id: number;
//     name: string;
// } 


/***/ }),

/***/ "ofEa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-04.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var TagLoadService = (function () {
    TagLoadService.$inject = ["Restangular"];
    function TagLoadService(Restangular) {
        this.Restangular = Restangular;
    }
    /**
     *
     * @param tagId 需要加载tag的id
     * @returns {IPromise<ITag>}
     */
    TagLoadService.prototype.load = function (tagId) {
        return this.Restangular.one("tags", tagId).get();
        ;
    };
    return TagLoadService;
}());
exports.default = TagLoadService;


/***/ }),

/***/ "qtjg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/languages/en-us.json";

/***/ }),

/***/ "s9oi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-01.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var ArticleEditCtrl = (function () {
    ArticleEditCtrl.$inject = ["$sce", "TagListLoadService"];
    function ArticleEditCtrl($sce, TagListLoadService) {
        this.$sce = $sce;
        this.loader = TagListLoadService;
        TagListLoadService.load();
    }
    ArticleEditCtrl.prototype.tagging = function (tag) {
        return { name: tag };
    };
    return ArticleEditCtrl;
}());
exports.default = ArticleEditCtrl;


/***/ }),

/***/ "ukWT":
/***/ (function(module, exports) {

module.exports = "<div class=\"article-detail\">\r\n    <header class=\"jumbotron jumbotron-header\" >\r\n        <h1 ng-bind=\"vm.loader.article.title\"></h1>\r\n    </header>\r\n    <div class=\"container-fluid content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2\">\r\n                <div class=\"article-content\" ng-bind-html=\"vm.$sce.trustAsHtml(vm.article.content)\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2\">\r\n                <div class=\"article-footer\">\r\n                    <div class=\"article-tag pull-left\">\r\n                        <span class=\"glyphicon glyphicon-tag\" aria-hidden=\"true\"></span>\r\n                        <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                        <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                        <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                        <a href=\"\" class=\"label label-transparent\">UI</a>\r\n                        <a href=\"\" class=\"label label-transparent\">Angular</a>\r\n                    </div>\r\n                    <span class=\"article-info pull-right\">\r\n                        <span ng-bind=\"vm.loader.article.author\"></span>\r\n                        <span ng-bind=\"vm.loader.article.create|date:'yyyy-MM-dd'\"></span>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2\">\r\n                <div class=\"article-discuss\">\r\n                    <div class=\"panel panel-discuss\">\r\n                        <div class=\"panel-heading\">\r\n\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ "ynnM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-04-02.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var ArticleListLoadService_1 = __webpack_require__("DCZT");
/*@ngInject*/
var ArticleListCtrl = (function () {
    ArticleListCtrl.$inject = ["$uibPosition", "$document", "ArticleListLoadService"];
    function ArticleListCtrl($uibPosition, $document, ArticleListLoadService) {
        var _this = this;
        this.loader = ArticleListLoadService;
        if (this.loader.articles.length == 0) {
            this.loader.load();
        }
        var lastDate = 0;
        $document.bind('scroll', function () {
            var bottom = $uibPosition.viewportOffset(document.body).bottom;
            //限制加载频率
            var nowDate = Date.now();
            if (bottom > -300 && nowDate - lastDate > 500 && _this.loader.loadState === ArticleListLoadService_1.LoadState.ready) {
                lastDate = nowDate;
                _this.loader.load();
            }
        });
    }
    return ArticleListCtrl;
}());
exports.default = ArticleListCtrl;


/***/ }),

/***/ "zGP0":
/***/ (function(module, exports) {

module.exports = "<div class=\"login\">\r\n    <div class=\"container-fluid content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4\">\r\n\r\n                <div class=\"panel panel-login\" >\r\n                    <div class=\"panel-heading\">\r\n                        <h3 class=\"article-title\" translate>\r\n                            登录\r\n                        </h3>\r\n                    </div>\r\n                    <div class=\"panel-body\" >\r\n                        <form name=\"loginForm\" ng-submit=\"vm.submit(loginParam)\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"username\" translate>用户名</label>\r\n                                <input type=\"text\" class=\"form-control\" id=\"username\" ng-minlength=\"5\"\r\n                                       ng-model=\"loginParam.username\" required>\r\n\r\n                                <label for=\"password\" translate>密码</label>\r\n                                <input type=\"password\" class=\"form-control\" id=\"password\" ng-minlength=\"3\"\r\n                                       ng-model=\"loginParam.password\" required>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <button class=\"btn btn-main btn-block\" type=\"submit\" translate>登录</button>\r\n                            </div>\r\n                        </form>\r\n\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "zoLL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-08.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ArticleDetailCtrl_1 = __webpack_require__("j7YV");
exports.default = angular.module('articleDetail', ['restangular'])
    .controller('ArticleDetailCtrl', ArticleDetailCtrl_1.default)
    .name;


/***/ })

},["m2IE"]);