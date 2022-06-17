import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {useCart, useDispatchCart} from "../components/contextComponents/Cart";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const products = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();

    const handleRemove = (index) => {
        dispatch({ type: "REMOVE", index });
    };

    return(
        <div style={{padding: "50px"}}>
            <Grid container spacing={2} >
                {products.length !== 0 ?
                    products.map((prod, index) => {
                        return (
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 350}}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="https://images.unsplash.com/photo-1602573852058-ef7c665fcd92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {prod.Categorie}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {prod.Name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <ShoppingBasketIcon style={{color: "black", padding: "4px"}} />
                                        <Button sx={{ my: 2, color: "black" }} size="small" onClick={() => handleRemove(prod)}>Remove from Cart</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                    :
                    <div>No cart items</div>
                }
            </Grid>
            <Button sx={{ my: 2, color: "black" }} size="small" onClick={() => navigate("/payments")}>Finish Transaction</Button>
        </div>
    )
}

export default HomePage;