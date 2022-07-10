import React, {useEffect, useContext} from 'react';
import "./LogIn.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Cookies from "js-cookie";

function LogIn() {

    const handleLogin = (path) => {
        window.location.assign(`https://backendplant.azurewebsites.net` + path)
    }

    return (
        <div className="login-container">
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <div className="login-form">
            <div className="logo-login">
                <div>
                    PLANTS
                </div>
            </div>
            <p><button className="login-with" data-test-id="google-login" onClick={() => handleLogin("/login-google")}><GoogleIcon style={{color: "black"}}/><span>Login Google</span></button></p>
            <p><button className="login-with" data-test-id="github-login" onClick={() => handleLogin("/login-github")}><GitHubIcon style={{color: "black"}}/><span>Login GitHub</span></button></p>
        </div>
        </div>
    );
}

export default LogIn;