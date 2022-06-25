import React, { useState, useReducer, useContext, createContext } from "react";
import Cookies from "js-cookie";

// const userLoginState = {
//     token: undefined,
//     logOut: () => undefined,
// }


const userStateContext = createContext();
const UserDispatchContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case "LOG_OUT":
            const user = []
            Cookies.remove("jwt-token");
            return user;
        default:
            throw new Error(`unknown action ${action.type}`);
    }
};

export const UserContextProvider = ({children}) => {
    // const [token, setToken] = useState(Cookies.get("jwt-token"))

    const [state, dispatch] = useReducer(reducer, []);

    // const logOut = () => {
    //     console.log("here")
    //     Cookies.remove("jwt-token");
    //     setToken(undefined)
    // }


    return(
        <UserDispatchContext.Provider value={dispatch}>
            <userStateContext.Provider value={state}>
                {children}
            </userStateContext.Provider>
        </UserDispatchContext.Provider>
    )
}

export const useUser = () => useContext(userStateContext);
export const useDispatchUser = () => useContext(UserDispatchContext);

