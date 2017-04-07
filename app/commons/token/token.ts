/**
 * Created by 米饭 on 2017-04-05.
 */


import * as angular from "angular"
import webStorage from "../localStorage/webStorage";
import TokenService from "./TokenService";


export default angular.module("token", ["restangular", webStorage])
    .service("TokenService", TokenService)
    .name;

