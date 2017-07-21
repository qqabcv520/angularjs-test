/**
 * Created by 米饭 on 2017-03-31.
 */

import {IRootScopeService} from "angular";

/*@ngInject*/
export default function appRun($rootScope: IRootScopeService,) {

    $rootScope.$on("$locationChangeStart", () => {//路径变化时
        document.body.scrollTop = 0;
    });

}


