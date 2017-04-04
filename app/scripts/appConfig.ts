/**
 * Created by 米饭 on 2017-03-31.
 */

import * as angular from 'angular';

import '../languages/zh-cn.json';
import '../languages/en-us.json';

/*@ngInject*/
export default function appConfig($translateProvider: angular.translate.ITranslateProvider) {

    $translateProvider.preferredLanguage('zh-cn');//语言
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');//设置HTML转义策略,在有参数时清除
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
}