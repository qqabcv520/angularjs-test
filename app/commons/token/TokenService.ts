/**
 * Created by 米饭 on 2017-04-05.
 */



import {local} from "angular";
import ILocalStorageService = local.storage.ILocalStorageService;
import {IService} from "restangular";

/*@ngInject*/
export default class TokenService {

    private _token: string;

    constructor(private Restangular: IService, private localStorageService: ILocalStorageService) {
        this.token = this.localStorageService.get<string>("token");
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

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
        this.Restangular.setDefaultHeaders({token: value});
        this.localStorageService.set<string>("token", value);
    }
}


export interface ILoginParam {
    username: string;
    password: string;
}