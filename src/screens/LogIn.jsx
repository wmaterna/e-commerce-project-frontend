import React from 'react';
import "./LogIn.css";
import {Button} from "@mui/material";

const LogIn = () => {
    return(
        <div className="login-container">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
                <form>
                    <div className="logo-login">
                        <div>
                            PLANTS
                        </div>
                    </div>
                    <div>
                        <button className="login-with-google-btn">Sign in with Google</button>
                        <button className="login-with-github-btn ">Sign in with GitHub</button>
                        {/*<button className="login-with-google-btn">Sign in with Facebook</button>*/}
                        {/*<button className="login-with-google-btn">Sign in with Twitter</button>*/}
                    </div>
                </form>
        </div>
    )
}

export default LogIn;