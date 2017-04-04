/**
 * Created by 米饭 on 2017-03-31.
 */


import * as angular from "angular";
import * as restangular from "restangular";

/*@ngInject*/
export default function appRun(Restangular: restangular.IService,
                               $translate: angular.translate.ITranslateService,
                               localStorageService: angular.local.storage.ILocalStorageService,
                               $rootScope: angular.IRootScopeService) {



    Restangular.setBaseUrl('http://192.168.1.130:8080/myblog');

    $rootScope.token = localStorageService.get('token');

    $rootScope.$watch('token', function (newVal) {
        Restangular.setDefaultHeaders({token: newVal});
        localStorageService.set('token', newVal);
    });


    $rootScope.token = localStorageService.get('token');

    $rootScope.$watch('token', function (newVal) {
        Restangular.setDefaultHeaders({token: newVal});
        localStorageService.set('token', newVal);
    });

    $rootScope.currentLang = localStorageService.get('currentLang') || 'zh-cn';

    $rootScope.$watch('currentLang', function (newVal) {
        if(newVal === null) {
            return;
        }
        localStorageService.set('currentLang', newVal);

        $translate.use($rootScope.currentLang);
    });
}


