import {useEffect, useState, useContext} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import "./Navbar.css";
import {useNavigate} from "react-router-dom";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {userStateContext} from "./contextComponents/userContext";



const Navbar = () => {

    const navigate = useNavigate();
    const [btnColor, setBtnsColor] = useState("white");
    const {token, logOut} = useContext(userStateContext);


    useEffect(() => {
        if(window.location.pathname !== "/"){
            setBtnsColor("black")
        } else {
            setBtnsColor("white")
        }
    },[window.location.pathname])

    const handleChangeLocation = (link) => {
        navigate(link);
    };


    return(
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                        <Button onClick={() => handleChangeLocation("/")}>
                            <div style={{color: btnColor, borderColor: btnColor}} className="navbar-conteriner-home logo">
                            PLANTS
                            </div>
                        </Button>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} >
                        <Box sx={{ flexGrow: 0 }}>
                            <Button  style={{color: btnColor}} sx={{ my: 2,fontWeight: "bold" }} onClick={() => handleChangeLocation("/shop")}>
                                Shop
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>

                            {token == undefined ?
                                <Button  data-test-id="login-btn" sx={{ my: 2, color: "black" }} onClick={() => handleChangeLocation("/login")}>
                                    Log In
                                </Button>
                                :
                                <>
                                <Button  data-test-id="userProfile" sx={{ my: 2, color: "black" }} onClick={() => handleChangeLocation("/user/info")}>
                                    User profile
                                </Button>
                                    <Button  data-test-id="userOrders" sx={{ my: 2, color: "black" }} onClick={() => handleChangeLocation("/orders")}>
                                        Orders
                                    </Button>
                                <Button data-test-id="logout" sx={{ my: 2, color: "black" }} onClick={() => logOut()}>
                                    Log Out
                                </Button>
                                </>
                            }


                        <Button data-test-id="cartBtn" sx={{ my: 2, color: "black" }} onClick={() => handleChangeLocation("/card")}>
                            <ShoppingBasketIcon style={{color: "black", padding: "10px"}} />
                            Cart
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;