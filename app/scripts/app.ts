/**
 * Created by 米饭 on 2017-03-05.
 */

// import "../../node_modules/bootstrap/less/bootstrap.less"
import "../styles/app.less";

import * as angular from "angular";

import home from "../components/home/home";
import token from "../commons/token/token";
import lang from "../commons/lang/lang";
import appConfig from "./appConfig";
import appRoute from "./appRoute";
import appRun from "./appRun";

angular.module("myApp", ["pascalprecht.translate", "restangular", "ui.router", lang, token, home])
    .config(appConfig)
    .config(appRoute)
    .run(appRun);






