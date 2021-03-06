import React, {useState, useEffect, useContext} from 'react';
import {CartStateContext} from "../components/contextComponents/Cart";
import {postOrder} from "./requests/postOrder";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {CircularProgress, Typography} from "@mui/material";
import {getUserInfo} from "./requests/getUserInfo";
import {userStateContext} from "../components/contextComponents/userContext";


export default function PaymentDetails(){

    const {token} = useContext(userStateContext)
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const [, setError] = useState("");
    const navigate = useNavigate();
    const {total} = useContext(CartStateContext);
    const {items} = useContext(CartStateContext);

    useEffect(() => {
        if(token == undefined){
            navigate("/login");
        }
    },[])

    useEffect(() => {
        getUserInfo(setLoading, setUserDetails, token, setError)
    },[])

    useEffect(() => {
        if(userDetails.length !== 0){
            const address = userDetails.city + " " + userDetails.street + " " + userDetails.postCode + " " +userDetails.apartmentNo;
            const current = new Date();
            const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
            const order = {
                date: date,
                price: total.toFixed(2),
                address: address,
                basket: items
            }
            postOrder(token, order, setLoading, setOrderId, setError)
        }
    },[userDetails]);


    return(
        <div style={{width: "100%", textAlign: "center"}}>{
            (!loading && orderId !== "") ?
            <div style={{width: "100%", height: "90vh", margin: "10% auto"}}>
                <Typography variant="h6" component="h6" style={{padding: "10px 0"}}>
                    Thank you for your order. Order id: {orderId}
                </Typography>
                <Button data-test-id="seeOrders" style={{margin: "20px", padding: "10px 20px", backgroundColor: "#557C55"}} variant="contained" onClick={() => navigate("/orders")}>Show all orders</Button>
            </div>
                :
           <CircularProgress />
        }

        </div>
    )
}