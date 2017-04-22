/**
 * Created by 米饭 on 2017-04-05.
 */



import LocalStorageService from "../localStorage/LocalStorageService";
import {IService} from "restangular";

/*@ngInject*/
export default class TokenService {


    private _token: string | null;
    private _isRemember: boolean;

    constructor(private Restangular: IService, private LocalStorageService: LocalStorageService) {
        this._isRemember = this.LocalStorageService.get<boolean>("isRemember") || false;
        if(this._isRemember) {
            this.token = this.LocalStorageService.get<string>("token");
        }
    }

    /**
     * 提交username和password，从服务端获取token
     * @param loginParam
     */
    login(loginParam: ILoginParam) {
        this.Restangular.all("users").customPOST(loginParam, "token").then((result) => {
            this.token = result.token
        }, function (err) {
            console.error("登录失败:" + err.state);
        });
    }

    get token(): string | null {
        return this._token;
    }

    set token(value: string | null) {
        this._token = value;
        this.Restangular.setDefaultHeaders({token: value});
        if(this._isRemember) {
            this.LocalStorageService.set<string>("token", value);
        }
    }

    get isRemember(): boolean {
        return this._isRemember;
    }

    set isRemember(value: boolean) {
        this._isRemember = value;
    }
}


export interface ILoginParam {
    username: string;
    password: string;
}
