/**
 * Created by 米饭 on 2017-04-06.
 */

import '../../languages/zh-cn.json';
import '../../languages/en-us.json';
import {translate} from "angular";
import ITranslateProvider = translate.ITranslateProvider;

/*@ngInject*/
export default function langConfig($translateProvider: ITranslateProvider) {

    $translateProvider.preferredLanguage('zh-cn');//语言
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');//设置HTML转义策略,在有参数时清除
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
}
