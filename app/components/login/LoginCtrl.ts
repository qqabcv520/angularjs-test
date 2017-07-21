/**
 * Created by 米饭 on 2017-04-04.
 */


import UserService, {ILoginParam} from "../../commons/user/UserService";
import {IStateService} from "@types/angular-ui-router";

/*@ngInject*/
export default class LoginCtrl {


    constructor(private UserService: UserService,
                private $state: IStateService) {
    }

    submit(loginParam: ILoginParam): void {
        this.UserService.login(loginParam).then(()=>{
            this.$state.go("home.articleList");

        });
    }

}
