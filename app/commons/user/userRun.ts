import {IService} from "restangular";
import UserService from "./UserService";
import Md5 from "./md5";
import * as angular from "angular";

/*@ngInject*/
export default function userRun(Restangular: IService, UserService: UserService) {
    Restangular.addFullRequestInterceptor(
        (element: any, operation: string, what: string, url: string, headers: any, params: any, httpConfig: angular.IRequestShortcutConfig) => {

            let newHeader;
            if(UserService.username != null) {
                newHeader = {
                    username: UserService.username,
                    curTimeStr: Date.now(),
                    nonce: Math.floor(Math.random() * 10000),
                    checkSum: ""
                };

                newHeader.checkSum = new Md5().hex_md5(
                    UserService.token + newHeader.username + newHeader.curTimeStr + newHeader.nonce
                );
            }


            return {
                element: element,
                params: params,
                headers: angular.extend(headers, newHeader),
                httpConfig: httpConfig
            };
        }
    );
}

