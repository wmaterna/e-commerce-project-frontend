import React, {useState, useEffect, useContext} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsForm from "./PaymentsForm";
import {CartStateContext} from "../components/contextComponents/Cart";
import {payment} from "./requests/makePayment";
import {userStateContext} from "../components/contextComponents/userContext";
import {useNavigate} from "react-router-dom";


const PaymentsPage = () => {

    const navigate = useNavigate()
    const {total} = useContext(CartStateContext);
    const {token} = useContext(userStateContext)
    const PUBLIC_KEY="pk_test_51LEfgGA2jOCNBtA0gPI2ap5RGcgevQgTrAGbQdiuGRexPev2ZAPEH0r3zLb3Glc4Y86kWeQa2DA8iz8Bp99syda700E04NyHbX";
    const stripeTestPromise = loadStripe(PUBLIC_KEY)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if(token == undefined){
            navigate("/login");
        }
    },[])

    useEffect(() => {
        payment(total, token, setClientSecret)
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return(
        <div>
            {
                clientSecret && (
                    <Elements options={options} stripe={stripeTestPromise}>
                        <PaymentsForm />
                    </Elements>
                )
            }
        </div>


    )
}

export default PaymentsPage;