/**
 * Created by 米饭 on 2017-04-05.
 */


import {translate} from "angular";
import ITranslateService = translate.ITranslateService;
import LocalStorageService from "../localStorage/LocalStorageService";

/*@ngInject*/
export default class LangService {



    private _currentLang: string;

    constructor(private LocalStorageService: LocalStorageService, private $translate: ITranslateService) {
        this.currentLang = LocalStorageService.get<string>('currentLang') || 'zh-cn';
    }

    get currentLang(): string {
        return this._currentLang;
    }

    set currentLang(value: string) {
        this._currentLang = value;
        this.LocalStorageService.set('currentLang', value);
        this.$translate.use(this._currentLang);
    }


}