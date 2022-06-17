import React, {useState, useEffect} from 'react';
import {useCart, useDispatchCart} from "../components/contextComponents/Cart";
import {Grid, TextField, Button} from "@mui/material";
import 'react-credit-cards/es/styles-compiled.css';
import {useNavigate} from "react-router-dom";
import {sendOrderInfo} from "./requests/sendOrderIndo";

const PaymentsPage = () => {
    const products = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();
    const [cardNo, setCardNo] = useState("");
    const [name, setName] = useState("");
    const [cvc, setCvc] = useState("");
    const [date, setDate] = useState("");
    const [submtBtnDisabled, setSubmitBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        sendOrderInfo(setLoading, products, setError, name, cvc, date, cardNo, navigate);
    }

    useEffect(()=>{
        if(cardNo !== "" && name !== "" && cvc != "" && date !=""){
            setSubmitBtnDisabled(false);
        } else {
            setSubmitBtnDisabled(true)
        }
    },[cardNo, name, cvc, date])


    return(
        <div style={{padding: "50px"}}>
            <div style={{maxWidth: "25%", maxHeight: "25%"}}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField label="1234 1234 1234 1234" onChange={(e) => setCardNo(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="John Smith" onChange={(e) => setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="23/22" onChange={(e) => setDate(e.target.value)}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="CVC" onChange={(e) => setCvc(e.target.value)}/>
                    </Grid>
                </Grid>
                <Button sx={{ my: 2, color: "black" }} size="small" disabled={submtBtnDisabled} onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default PaymentsPage;