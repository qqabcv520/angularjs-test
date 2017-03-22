/**
 * Created by 米饭 on 2017-03-08.
 */

(function() {
    'use strict';

    angular.module('articleList', ['ui.bootstrap', 'restangular'])
        .controller('ArticleListCtrl',  ArticleListCtrl);

    ArticleListCtrl.$inject = ['$scope', '$rootScope', '$document', 'Restangular', '$uibPosition'];
    function ArticleListCtrl($scope, $rootScope, $document, Restangular, $uibPosition){
        $rootScope.articles = [];
        $scope.loading = false;
        var loadParam = {
            offset: 0,
            limit: 10
        };

        load();

        $document.bind('scroll', scrollHandler);

        var lastDate = 0;
        function scrollHandler() {
            var bottom = $uibPosition.viewportOffset(document.body).bottom;

            //限制加载频率
            var nowDate =  Date.now();
            if(bottom > - 300 && nowDate-lastDate > 500 && !$scope.loading) {
                lastDate = nowDate;
                load();
            }
        }

        function load() {
            $scope.loading = true;
            Restangular.all("articles").getList(loadParam).then(function (result) {
                for(var i = 0; i <  result.length; i++) {
                    $rootScope.articles.push(result[i]);
                }
                loadParam.offset += loadParam.limit;
                $scope.loading = false;

            }, function(err){
                console.error('加载articleList错误:' + err);
                $scope.loading = false;
            });
        }


    }



})();

