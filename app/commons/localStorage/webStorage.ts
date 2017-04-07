/**
 * Created by 米饭 on 2017-04-07.
 */
import * as angular from "angular";
import LocalStorageService from "./LocalStorageService";

export default angular.module("webStorage ", [])
    .service("LocalStorageService", LocalStorageService)
    .name;

