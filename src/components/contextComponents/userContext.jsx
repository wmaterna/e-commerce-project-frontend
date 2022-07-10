import React, { useState, createContext } from "react";
import Cookies from "js-cookie";
import moment from "moment";

const defaultValue = {
    token: undefined,
    logOut: () => undefined,
    logIn: () => undefined
}


export const userStateContext = createContext(defaultValue);


export const UserContextProvider = ({ children }) => {
   const [token, setToken] = useState(Cookies.get("jwt-token2"))

    const logOut = () => {
        Cookies.remove("jwt-token2");
        setToken(undefined)
    }

    const logIn = (token) => {
        setToken(token)
        Cookies.set("jwt-token2", token, {expires: moment().add(3600000, "milliseconds").date()});
    }

    return(
        <userStateContext.Provider value={{token, logOut,logIn}}>
            {children}
        </userStateContext.Provider>
    )
}


