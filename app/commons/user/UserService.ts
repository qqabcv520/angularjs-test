/**
 * Created by 米饭 on 2017-04-05.
 */



import LocalStorageService from "../localStorage/LocalStorageService";
import {IPromise, IService} from "restangular";

/*@ngInject*/
export default class UserService {



    private _username: string | null;
    private _token: string | null;
    private _isRemember: boolean;

    constructor(private Restangular: IService, private LocalStorageService: LocalStorageService) {
        this._isRemember = this.LocalStorageService.get<boolean>("isRemember") || true;
        if(this._isRemember) {
            this._username = this.LocalStorageService.get<string>("username");
            this._token = this.LocalStorageService.get<string>("token");
        }
    }

    /**
     * 提交username和password，从服务端获取token
     * @param loginParam
     */
    login(loginParam: ILoginParam) {
        return this.Restangular.all("users").customPOST(loginParam, "token").then(
            result => {
            this.username = loginParam.username;
            this.token = result.token;
        }, err=>{
            console.error("登录失败:" + err.status);
        });
    }

    get username(): string | any {
        return this._username;
    }

    set username(value: string | any) {
        this._username = value;
        if(this._isRemember) {
            this.LocalStorageService.set<string>("username", value);
        }
    }

    get token(): string | null {
        return this._token;
    }

    set token(value: string | null) {
        this._token = value;
        if(this._isRemember) {
            this.LocalStorageService.set<string>("token", value);
        }
    }

    get isRemember(): boolean {
        return this._isRemember;
    }

    set isRemember(value: boolean) {
        this._isRemember = value;
        this.LocalStorageService.set<boolean>("username", value);
    }
}


export interface ILoginParam {
    username: string;
    password: string;
}
