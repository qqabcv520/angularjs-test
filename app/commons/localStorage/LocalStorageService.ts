/**
 * Created by 米饭 on 2017-04-07.
 */


import { IWindowService} from "angular";
import * as angular from "angular";

/*@ngInject*/
export default class LocalStorageService {

    private localStorage: Storage;
    private _isSupported: boolean;

    constructor($window: IWindowService) {
        this.localStorage = $window.localStorage;
        this._isSupported = !!$window.localStorage;
    }

    set<T>(key: string, value: T | null) {
        let jsonStr = angular.toJson(value);
        this.localStorage.setItem(key, jsonStr);
    }
    get<T>(key: string): T | null {
        let jsonStr = this.localStorage.getItem(key);
        if(!jsonStr) {
            return null;
        }
        return angular.fromJson(jsonStr);
    }

    clear(): void {
        this.localStorage.clear();
    }

    remove(key: string): void {
        this.localStorage.removeItem(key);
    }


    get isSupported(): boolean {
        return this._isSupported;
    }

    get length(): number {
        return this.localStorage.length;
    }
}

