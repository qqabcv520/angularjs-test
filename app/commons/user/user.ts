/**
 * Created by 米饭 on 2017-04-05.
 */


import * as angular from "angular"
import webStorage from "../localStorage/webStorage";
import UserService from "./UserService";


export default angular.module("user", ["restangular", webStorage])
    .service("UserService", UserService)
    // .run()
    .name;

