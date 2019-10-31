import { observable, action } from 'mobx';
import {ApiService, JwtService} from "ts-axios-jwt-toolkit2";
import {AuthSuccessResponse, LoginUser} from "./types";
import User from "../../../models/User";

export class AuthStore {
    @observable
    public inProgress = false;
    @observable
    public errors: string = "";

    @observable
    public values = {
        email: '',
        password: '',
    };

    @observable currentUser: User | undefined;

    @action reset() {
        this.values.email = '';
        this.values.password = '';
    };

    @action login(credentials: LoginUser) {
        this.inProgress = true;
        this.errors = "";
        return ApiService.post("users/login", credentials)
            .then(({data} : any) => this.setLoginState(data.user))
            .catch(action((err: { response: { body: { errors: any; }; }; }) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    };

    setLoginState(user: AuthSuccessResponse) {
        this.currentUser = new User(user.first_name + " " + user.last_name, user.email, user.token);
        JwtService.saveToken(user.token);
    }
}

export default new AuthStore();
