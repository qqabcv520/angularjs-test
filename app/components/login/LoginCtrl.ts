/**
 * Created by 米饭 on 2017-04-04.
 */


import TokenService, {ILoginParam} from "../../commons/token/TokenService";

/*@ngInject*/
export default class LoginCtrl {


    constructor(private TokenService: TokenService) {
    }

    submit(loginParam: ILoginParam): void {
        console.log(loginParam);
        this.TokenService.login(loginParam);
    }

}
