/**
 * Created by 米饭 on 2017-03-15.
 */


(function() {
    'use strict';


    angular.module('login', ['restangular'])
        .controller('LoginCtrl', loginCtrl);


    loginCtrl.$inject = ['$scope', '$rootScope', 'Restangular', 'localStorageService'];
    function loginCtrl($scope, $rootScope, Restangular, localStorageService) {
        $scope.login = {};
        $scope.submit = submit;

        function submit() {
            console.log($scope.login.password);

            Restangular.one("users").post('token', $scope.login).then(function (result) {
                if(result.code == 0) {
                    $rootScope.token = result.data;
                } else {
                    console.error('登录失败:' + result.state);
                }

            }, function(err){
                console.error('提交登录信息失败:' + err);
            });
        }

    }
})();