/**
 * Created by 米饭 on 2017-03-31.
 */

import {IProvider} from "restangular";

/*@ngInject*/
export default function appConfig(RestangularProvider: IProvider) {
    RestangularProvider.setBaseUrl('https://mifan123.cn:8443');
}