 /**
 * Created by 米饭 on 2017-03-15.
 */


import * as angular from 'angular';
import token from "../../commons/token/token";
import LoginCtrl from "./LoginCtrl";


export default angular.module('login', ['restangular', token])
    .controller('LoginCtrl', LoginCtrl)
    .name;

