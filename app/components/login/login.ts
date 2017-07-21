 /**
 * Created by 米饭 on 2017-03-15.
 */


import * as angular from 'angular';
import user from "../../commons/user/user";
import LoginCtrl from "./LoginCtrl";


export default angular.module('login', ['restangular', user])
    .controller('LoginCtrl', LoginCtrl)
    .name;

