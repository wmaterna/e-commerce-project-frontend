import React, {useEffect, useState} from 'react';
import "./HomePage.css";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getUserInfo} from "./requests/getUserInfo";
import Cookies from "js-cookie";

const HomePage = () => {
    const token = Cookies.get("jwt-token");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        getUserInfo(setLoading, setUserInfo, token, setError)
    },[])
    const navigete = useNavigate()
    return(
        <div>
        <div className="home-page-container">
            <div className="welcome-box">
                <h2>The easiest way to make healthy life by buing your favourite plants</h2>
                <p>Very beautiful plnt decorations make our lives healthy and home enviroment so that the atmosphere becomes calmer</p>
                <Button onClick={() => navigete("/shop")} sx={{ my: 2, color: "white",fontWeight: "bold" }}>Shop now</Button>
            </div>
        </div>
        <div className="promo-container">
            <h2>What we offer</h2>
            <p>and what you need</p>
            <div className="offer-box">
                <div>
                    <div className="bulb"></div>
                    <h2>Collectionary Plants</h2>
                    <p>Plants that cannot be found in any other shops</p>
                </div>
                <div>
                    <div className="bulb"><img scr="https://www.flaticon.com/free-icons/environment"/></div>
                    <h2>Accesories and Pest</h2>
                    <p>Everything you need to pop up your apartments even more</p>
                </div>
                <div>
                    <div className="bulb"></div>
                    <h2>Air Cleaning Plants</h2>
                    <p>Because clean apartment is also healthy apartment</p>
                </div>
            </div>
        </div>
      </div>
    )
}

export default HomePage;