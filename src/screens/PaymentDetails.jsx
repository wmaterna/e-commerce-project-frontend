import React, {useState, useEffect, useContext} from 'react';
import {CartStateContext} from "../components/contextComponents/Cart";
import {postOrder} from "./requests/postOrder";

import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";


export default function PaymentDetails(){

    const [token, setToken] = useState(Cookies.get("jwt-token"));
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState("");
    const navigate = useNavigate();
    const {total} = useContext(CartStateContext);
    const {items} = useContext(CartStateContext);
    const testOrder = {
        date: Date.now(),
        price: 25.22,
        address: "Some address",
        products: items,
    }
    useEffect(() => {
        postOrder(token, testOrder, setLoading, setOrderId)
    },[]);


    return(
        <div>{
            !loading &&
            <>
                <p>Thanks for ordering in our shop your order id is: {orderId}</p>
                <Button onClick={() => navigate("/orders")}>Show all orders</Button>
            </>
        }

        </div>
    )
}