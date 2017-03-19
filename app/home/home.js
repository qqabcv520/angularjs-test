/**
 * Created by 米饭 on 2017-03-07.
 */




(function() {
    'use strict';



    angular.module('home', ['ngAnimate', 'ui.bootstrap', 'ui.router', 'article', 'login'])
        .controller('HomeCtrl',  HomeCtrl)
        .value('navbar', {headerHeight: 350});



    HomeCtrl.$inject = ['$scope', '$document', '$q', '$translate', '$state', 'navbar'];
    function HomeCtrl($scope, $document, $q, $translate, $state, navbar) {

        $scope.currentTab = 0;
        $scope.isNavCollapsed = true;
        $scope.isInit = isInit;
        $scope.navBgTransparent = document.body.scrollTop < navbar.headerHeight;

        $document.bind('scroll', scrollHandler);

        $scope.currentLang = $translate.use();
        $scope.switchLang = switchLang;


        $scope.$on('$locationChangeStart',function() {//路径变化时
            $scope.isNavCollapsed = true;
            changeNavBg();
        });

        var initState = true;
        function isInit() {     //collapse初始会自动执行一次，不知道啥原因，
            if(initState) {     //禁止执行
                var deferred = $q.defer();
                deferred.reject();
                initState = false;
                return deferred.promise;
            }
        }



        function scrollHandler() {
            $scope.$apply(changeNavBg);
        }

        function changeNavBg() {
            if (document.body.scrollTop >= navbar.headerHeight && $scope.navBgTransparent) {
                $scope.navBgTransparent = false;
            } else if (document.body.scrollTop < navbar.headerHeight && !$scope.navBgTransparent){
                $scope.navBgTransparent = true;
            }
        }




        function switchLang() {
            if ($scope.currentLang != 'zh-cn') {
                $scope.currentLang = 'zh-cn';
            } else {
                $scope.currentLang = 'en-us';
            }
            window.localStorage.lang = $scope.currentLang;
            var ranslatePromise = $translate.use($scope.currentLang);

            ranslatePromise.then(function () {
                $state.reload();
            });

        }
    }

})();

