/**
 * Created by 米饭 on 2017-04-05.
 */
import * as angular from "angular";
import webStorage from "../localStorage/webStorage";
import LangService from "./LangService";
import langConfig from "./langConfig";

export default angular.module("lang", [webStorage])
    .service("LangService", LangService)
    .config(langConfig)
    .name;

