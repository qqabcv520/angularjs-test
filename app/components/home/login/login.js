 /**
 * Created by 米饭 on 2017-03-15.
 */


import angular from 'angular'


export default angular.module('login', ['restangular'])
    .controller('LoginCtrl', loginCtrl)
    .name;


 /*@ngInject*/
function loginCtrl($scope, Restangular) {
    $scope.login = {};
    $scope.submit = submit;

    function submit() {
        console.log($scope.login.password);

        Restangular.one("users").post('token', $scope.login).then(function (result) {

        }, function(err){
            console.error('登录失败:' + err.state);
        });
    }
}