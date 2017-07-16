/**
 * Created by 米饭 on 2017-07-08.
 */

import * as angular from "angular";
import ReviewLoadService from "./ReviewLoadService";

export default angular.module("reviewLoad", ["restangular"])
    .service("ReviewLoadService", ReviewLoadService)
    .name;


