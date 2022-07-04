import React from 'react';
import "./HomePage.css";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigete = useNavigate()


    return(
        <div>
        <div className="home-page-container">
            <div className="welcome-box">
                                <h2>The easiest way to make healthy life is by buying your favourite plants</h2>
                                <p className="header-p">Very beautiful plant decorations make our lives healthy and home enviroment so that the atmosphere becomes calmer</p>
                                <Button id="shop-header" onClick={() => navigete("/shop")} sx={{ my: 2, color: "white",fontWeight: "bold" }}>Shop now</Button>

            </div>
        </div>
        <div className="promo-container">
            <h3>What we offer</h3>
            <p>and what you need</p>
            <div className="offer-box">
                <div>
                    <div className="bulb"></div>
                    <h3>Collectionary Plants</h3>
                    <p id="promotion">Plants that cannot be found in any other shops</p>
                </div>
                <div>
                    <div className="bulb"><img scr="https://www.flaticon.com/free-icons/environment"/></div>
                    <h3>Accesories and Pest</h3>
                    <p id="promotion2">Everything you need to pop up your apartments even more</p>
                </div>
                <div>
                    <div className="bulb"></div>
                    <h3>Air Cleaning Plants</h3>
                    <p id="promotion3">Because clean apartment is also healthy apartment</p>
                </div>
            </div>
        </div>
      </div>
    )
}

export default HomePage;