import React, {useContext} from 'react';
import {
    Avatar,
    Button,
    Divider,
    Grid, IconButton,
    List,
    ListItem, ListItemAvatar, ListItemText,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {CartStateContext} from "../components/contextComponents/Cart";
import {userStateContext} from "../components/contextComponents/userContext";

const CartPage = () => {
    const {items, total, addItem, removeItem} = useContext(CartStateContext);
    const {token} = useContext(userStateContext);
    const navigate = useNavigate();
    console.log(total)
    return(
        <Grid style={{padding: "50px 100px"}}>
            <Grid container>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {items.length !== 0 ?
                    items.map((prod, index) => {
                            return (
                                <>
                                    <ListItem id={index} className="basketItem" alignItems="flex-start"
                                              style={{padding: "20px"}}
                                              secondaryAction={
                                        <>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="p"
                                                        color="text.primary"
                                                    >
                                                        {prod.quantity * prod.product.price}
                                                    </Typography>
                                                <IconButton data-test-id="plusBtn" edge="end" aria-label="delete" onClick={() => addItem(prod.product)}>
                                                    <AddIcon />
                                                </IconButton>
                                                <span style={{padding: "0 5px 0 15px"}}>{prod.quantity}</span>
                                                <IconButton data-test-id="minusBtn" edge="end" aria-label="delete" onClick={() => removeItem(prod.product.id, false, prod.product.price)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                  <IconButton data-test-id="deleteFromBinBtn" style={{padding: "20px"}} edge="end" aria-label="delete" onClick={() => removeItem(prod.product.id, true, prod.product.price*prod.quantity)}>
                                                      <DeleteIcon />
                                                  </IconButton>
                                        </>
                                              }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ height: '100px', width: '100px' }} alt="product-img" width="100px" src={prod.product.url} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{margin: "3%"}}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="h6"
                                                        color="text.primary"
                                                    >
                                                        {prod.product.name}
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
                <Grid container justifyContent="space-between">
                    <Typography
                        sx={{ display: 'inline' , margin: "20px", padding: "10px" }}
                        component="span"
                        variant="h5"
                        color="text.primary"
                    >
                        {items.length !== 0 ? <><b>Total: </b> {total.toFixed(2)} <b>$</b></> : <><b>Total: </b> 0 <b>$</b></>}
                    </Typography>
                    {items.length !== 0 &&
                        <>{
                        token ?
                            <Button data-test-id="payBtn" style={{margin: "20px", padding: "10px 20px", backgroundColor: "#557C55"}} variant="contained" className="greenBtn" size="small" onClick={() => navigate("/pre-order-info")}>Order details</Button>
                            :
                            <Button data-test-id="payBtn" style={{margin: "20px", padding: "10px 20px", backgroundColor: "#557C55"}} variant="contained" size="small" onClick={() => navigate("/login")}>Log in</Button>
                        }
                        </>

                    }
                </Grid>

        </Grid>
    )
}

export default CartPage;