/**
 * Created by 米饭 on 2017-04-05.
 */


import * as angular from "angular"
import TokenService from "./TokenService";


export default angular.module("token", ["restangular", "LocalStorageModule"])
    .service("TokenService", TokenService)
    .name;

