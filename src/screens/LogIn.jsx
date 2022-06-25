import React from 'react';
import "./LogIn.css";

function LogIn() {

    const handleLogin = (path) => {
        window.location.assign(`http://localhost:8080` + path)
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
            <p><button className="login-with-google-btn" onClick={() => handleLogin("/login-google")}>Login Google</button></p>
            <p><button className="login-with-github-btn" onClick={() => handleLogin("/login-github")}>Login GitHub</button></p>
        </div>
        </div>
    );
}

export default LogIn;