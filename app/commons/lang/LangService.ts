/**
 * Created by 米饭 on 2017-04-05.
 */


import {translate, local} from "angular";
import ITranslateService = translate.ITranslateService;
import ILocalStorageService = local.storage.ILocalStorageService;

/*@ngInject*/
export default class LangService {



    private _currentLang: string;

    constructor(private localStorageService: ILocalStorageService, private $translate: ITranslateService) {
        this.currentLang = localStorageService.get<string>('currentLang') || 'zh-cn';
    }

    get currentLang(): string {
        return this._currentLang;
    }

    set currentLang(value: string) {
        this._currentLang = value;
        this.localStorageService.set('currentLang', value);
        this.$translate.use(this._currentLang);
    }


}