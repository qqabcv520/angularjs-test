/**
 * Created by 米饭 on 2017-03-08.
 */

(function() {
    'use strict';

    angular.module('articleList', ['ui.bootstrap', 'restangular'])
        .controller('ArticleListCtrl',  ArticleListCtrl);

    ArticleListCtrl.$inject = ['$rootScope', '$document', 'Restangular', '$uibPosition'];
    function ArticleListCtrl($rootScope, $document, Restangular, $uibPosition){
        $rootScope.articles = [];
        var loadParam = {
            offset: 0,
            limit: 10
        };

        load();

        $document.bind('scroll', scrollHandler);

        var loading = false;
        var lastDate = 0;
        function scrollHandler() {
            var bottom = $uibPosition.viewportOffset(document.body).bottom;

            //限制加载频率


            var nowDate =  Date.now();

            if(bottom > - 300 && nowDate-lastDate > 500 && !loading) {
                lastDate = nowDate;
                load();
            }

        }

        function load() {
            loading = true;
            Restangular.one("articles").get(loadParam).then(function (result) {
                if(result.code == 0) {
                    for(var i = 0; i <  result.data.length; i++) {
                        $rootScope.articles.push(result.data[i]);
                    }
                    loadParam.offset += loadParam.limit;
                    loading = false;
                }

            }, function(err){
                console.error('加载articleList错误:' + err);
                loading = false;
            });
        }


    }



})();

