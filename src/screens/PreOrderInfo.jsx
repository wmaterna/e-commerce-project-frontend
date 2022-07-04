import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartStateContext} from "../components/contextComponents/Cart";
import Button from "@mui/material/Button";
import {getUserInfo} from "./requests/getUserInfo";
import {Breadcrumbs, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {userStateContext} from "../components/contextComponents/userContext";

export default function PreOrderInfo(){

    const navigate = useNavigate();
    const {token} = useContext(userStateContext);
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState("");
    const [, setError] = useState("");
    const [validData, setValidData] = useState(false);
    const {total} = useContext(CartStateContext);

    function getUserFrom(){
        if(!validData){
            return (<Button data-test-id="fillUserData" onClick={() => navigate("/user/info")}>Fill the address data</Button>)
        } else {
            return (<Grid style={{padding: "30px 80px"}}>
                        <Typography variant="h4" component="h4" style={{padding: "10px 0"}}>
                            Address details
                        </Typography>

                        <Divider style={{padding: "10px"}}/>

                        <Typography variant="h6" component="h6" style={{padding: "10px 0"}}>
                            City
                        </Typography>
                        <Typography variant="p" component="p">
                            {userInfo.city}
                        </Typography>

                        <Divider style={{padding: "10px"}}/>
                        <Typography variant="h6" component="h6" style={{padding: "10px 0"}}>
                            Street and apartment
                        </Typography>
                        <Typography variant="p" component="p">
                            {userInfo.street} {userInfo.apartmentNo}
                        </Typography>
                        <Divider style={{padding: "10px"}}/>
                        <Typography variant="h6" component="h6" style={{padding: "10px 0"}}>
                            Post code
                        </Typography>
                        <Typography variant="p" component="p">
                            {userInfo.postCode}
                        </Typography>
                        <Divider style={{padding: "10px"}} />
                        <Typography variant="h6" component="h6" style={{padding: "10px 0"}}>
                            Total: {total.toFixed(2)}
                        </Typography>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button data-test-id="fillUserData" style={{color: "#557C55"}} onClick={() => navigate("/user/info")}>Not correct data? </Button>
                            <Button data-test-id="navigatePayBtn" style={{margin: "20px", padding: "10px 20px", backgroundColor: "#557C55"}} variant="contained" size="small" onClick={() => navigate("/payments")}>Pay by credit card</Button>
                        </div>
                    </Grid>)
        }
    }

    const breadcrumbs = [
        <Button underline="hover" key="1" color="inherit" href="/card" onClick={() => navigate("/cart")}>
            Cart
        </Button>,
        <Typography key="3" color="text.primary">
            Address
        </Typography>,
        <Button
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            disabled={true}
            onClick={()=>navigate("/payment")}
        >
            Payment
        </Button>,
    ];

    useEffect(() => {
        getUserInfo(setLoading, setUserInfo, token, setError)
    },[]);

    useEffect(() => {
        if(userInfo.city !== undefined && userInfo.apartmentNo !== undefined && userInfo.street !== undefined && userInfo.postCode !== undefined){
            setValidData(true)
        }else{
            setValidData(false)
        }
    },[userInfo])

    return(
        <div>{
            !loading ?
            <>
                <div>
                    <Breadcrumbs style={{padding: "0 80px"}}
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                    {userInfo &&
                        <>
                            {getUserFrom()}
                        </>
                    }
                </div>
            </> :
                <CircularProgress />
        }

        </div>
    )
}