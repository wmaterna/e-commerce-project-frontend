import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Divider,
    Grid, IconButton,
    List,
    ListItem, ListItemAvatar, ListItemText,
    Typography
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {useCart, useDispatchCart} from "../components/contextComponents/Cart";
import {UserStateContext} from "../components/contextComponents/userContext"
import {useNavigate} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    // const products = useCart();
    const products = useCart();


    const dispatch = useDispatchCart();
    const navigate = useNavigate();
    const [itemsCount, setItemsCount] = useState();

    const handleRemove = (index) => {
        dispatch({ type: "REMOVE", index });
    };

    return(
        <Grid style={{padding: "50px 100px"}}>
            <Grid container>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {products.length !== 0 ?
                    products.map((prod, index) => {
                            return (
                                <>
                                    <ListItem id={index} alignItems="flex-start"
                                              style={{padding: "20px"}}
                                              secondaryAction={
                                                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(index)}>
                                                      <DeleteIcon />
                                                  </IconButton>
                                              }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ height: '100px', width: '100px' }} alt="product-img" width="100px" src={prod.url} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{margin: "3%"}}
                                            secondary={
                                                <React.Fragment >
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="h6"
                                                        color="text.primary"
                                                    >
                                                        {prod.name}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            )

                    })
                    :
                    <div>No cart items</div>
                }
                </List>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Button style={{margin: "20px", padding: "10px"}} variant="contained" size="small" onClick={() => navigate("/payments")}>Let's pay</Button>
            </Grid>
        </Grid>
    )
}

export default CartPage;