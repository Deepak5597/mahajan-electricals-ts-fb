import { createContext, FC, useState } from "react";
import IAuth from "../models/auth";
import IAuthContext from "../models/auth.context";

const initialValue: IAuthContext = { isLoggedIn: false };
const guestAuth: IAuth = { email: "dummy@gmail.com", role: "guest" }

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthContextProvider: FC = ({ children }) => {

    const [auth, setAuth] = useState<IAuth>((): IAuth => {
        const lsAuthData = localStorage.getItem("auth");
        if (lsAuthData) {
            const parsedData = JSON.parse(lsAuthData);
            return { ...parsedData }
        } else {
            return guestAuth
        }
    })
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>((): boolean => {
        const lsStatus = localStorage.getItem("isLoggedIn");
        if (lsStatus) {
            const parsedData = Boolean(lsStatus);
            return parsedData;
        } else {
            return false;
        }
    })

    const logout = () => {
        setAuth(guestAuth);
        setIsLoggedIn(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("isLoggedIn");
    }
    const login = (auth: IAuth) => {
        setAuth(auth);
        setIsLoggedIn(true);
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("isLoggedIn", String(true));
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}