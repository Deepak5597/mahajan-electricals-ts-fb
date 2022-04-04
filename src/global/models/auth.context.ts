import IAuth from "./auth";

export default interface IAuthContext {
    auth?: IAuth,
    isLoggedIn: boolean,
    login?: Function,
    logout?: Function
}