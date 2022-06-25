import React, {useState, useEffect} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsForm from "./PaymentsForm";



const PaymentsPage = () => {


    const testOrder = {
        date: "2022-22-02",
        address: "Jakis addres",
        price: "87",
        user: 7,
        products: [
            {
                quantity: 2, product: 1
            },
            {
                quantity: 1, product: 2
            }
        ]
     }

    const PUBLIC_KEY="pk_test_51LEfgGA2jOCNBtA0gPI2ap5RGcgevQgTrAGbQdiuGRexPev2ZAPEH0r3zLb3Glc4Y86kWeQa2DA8iz8Bp99syda700E04NyHbX";
    const stripeTestPromise = loadStripe(PUBLIC_KEY)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/createPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testOrder),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


console.log()
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