import React, { useState, createContext } from "react";
import Cookies from "js-cookie";

const defaultValue = {
    token: undefined,
    logOut: () => undefined,
}


export const userStateContext = createContext(defaultValue);


export const UserContextProvider = ({ children }) => {
   const [token, setToken] = useState(Cookies.get("jwt-token"))

    const logOut = () => {
        Cookies.remove("jwt-token");
        setToken(undefined)
    }



    return(
        <userStateContext.Provider value={{token, logOut}}>
            {children}
        </userStateContext.Provider>
    )
}


