/**
 * Created by 米饭 on 2017-03-17.
 */


(function() {
    'use strict';

    angular.module('articleEdit', ['ui.select', 'wangEditorDirective', 'ngSanitize'])
        .controller('ArticleEditCtrl', ArticleEditCtrl);


    ArticleEditCtrl.$inject = ['$scope', 'Restangular'];
    function ArticleEditCtrl($scope, Restangular) {

        $scope.tagging = tagging;

        Restangular.one("tags").get().then(function (result) {
            if(result.code === 0) {
                $scope.tags = result.data;
            }
        }, function(err){
            console.error('加载tagList错误:' + err);
        });


        function tagging(tag) {
            return {name: tag};
        }
    }

})();