/**
 * Created by 米饭 on 2017-03-08.
 */


(function() {
    'use strict';

    angular.module('articleDetail', ['restangular'])
        .controller('ArticleDetailCtrl',  ArticleDetailCtrl);

    ArticleDetailCtrl.$inject = ['$scope', '$stateParams', 'Restangular', '$sce'];
    function ArticleDetailCtrl($scope, $stateParams, Restangular, $sce){
        Restangular.one("articles", $stateParams.articleId).get().then(function (result) {
            if(result.code == 0) {
                console.debug(result.data);
                $scope.article = result.data;
                $scope.article.content = $sce.trustAsHtml($scope.article.content);
            }

        }, function(err){
            console.error('加载articleList错误:' + err);
        });
    }



})();
