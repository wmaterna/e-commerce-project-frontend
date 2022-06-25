import React, {useEffect, useState} from 'react';
import {
    CardMedia,
    CardActions,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    Drawer,
    Accordion,
    AccordionSummary, AccordionDetails, TextField, Divider
} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {getProductDetail} from "./requests/getProductDetail";
import {useDispatchCart} from "../components/contextComponents/Cart";

function ExpandMoreIcon() {
    return null;
}

const ProductDetail = (props) => {

    const dispatch = useDispatchCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [productInfo, setProductInfo]= useState({})
    const [opinions, setOpinions] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if(props.drawerOpen){
            getProductDetail(props.id, setLoading, setProductInfo, setOpinions, setError)
        }else {
            setShowForm(false)
        }
    },[props.drawerOpen]);

    const addToCart = (item) => {
        dispatch({ type: "ADD", item });
    };

    return(<Drawer
            anchor="right"
            open={props.drawerOpen}
            onClose={() => props.onClose()}
            >
        {
            loading ?
                <div>Loading ... </div>:
                <div>
                    {
                        productInfo.length != 0 ?
                            <div>
                                <Grid container sx={{ minWidth: 150, maxWidth: 1000}}>
                                        <Grid item xs={4} style={{padding: "50px"}}>
                                        <CardMedia
                                            component="img"
                                            height="500"
                                            image={productInfo.url}
                                            alt="green iguana"
                                        />
                                        </Grid>
                                        <Grid item xs={8} style={{padding: "50px"}}>
                                        <CardContent>
                                         <Typography gutterBottom variant="h4" component="div">
                                              {productInfo.name}
                                        </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{padding: "30px 0"}}>
                                         {productInfo.description}
                                          </Typography>
                                        </CardContent>
                                            <Grid container justifyContent="flex-end" style={{padding: "0 20px"}} >
                                                <CardActions>
                                                    <Button onClick={() => {
                                                        addToCart(productInfo);
                                                        props.onClose();
                                                    }}
                                                            style={{color: "black"}}
                                                    ><ShoppingBasketIcon style={{color: "black", padding: "5px"}} />Add to cart</Button>
                                                </CardActions>
                                            </Grid>
                                            <Divider />
                                            <CardContent>
                                                <>
                                                    {showForm &&
                                                        <Grid style={{padding: "20px 0"}}>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                Let us know what you think
                                                            </Typography>
                                                            <TextField
                                                                fullWidth
                                                                id="outlined-multiline-static"
                                                                label="Review"
                                                                multiline
                                                                rows={3}
                                                                defaultValue="Review message"
                                                            />
                                                            <Grid style={{padding: "20px"}}>
                                                                <Button variant="contained" style={{color: "black", padding: "10px", marginRight: "20px"}}>
                                                                    Add
                                                                </Button>
                                                                <Button onClick={() => setShowForm(false)} variant="outlined" style={{color: "black", padding: "10px"}}>
                                                                    Cancel
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                </>
                                                {opinions.length !== 0 ?
                                                    <>
                                                        <Grid container>
                                                            <Grid tem xs={10}>
                                                                <Typography gutterBottom variant="h6" component="div">
                                                                    Customers' reviews
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            {!showForm &&
                                                                <Button onClick={()=>setShowForm(true)} size="small" style={{color: "black", paddingBottom: "15px"}}>Add review</Button>
                                                            }  </Grid>
                                                        </Grid>

                                                    {
                                                        Object.keys(opinions).map((opinion) => {
                                                           return(<Accordion>
                                                                <AccordionSummary
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography gutterBottom  component="div">
                                                                        {opinions[opinion].user[0].name}
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography gutterBottom variant="body2" component="div">
                                                                        {opinions[opinion].content}
                                                                    </Typography>
                                                                </AccordionDetails>
                                                            </Accordion>)
                                                        })
                                                    }
                                                    </>
                                                    :
                                                    <>
                                                        <Grid container>
                                                            <Grid tem xs={10}>
                                                                <Typography gutterBottom component="div">
                                                                    There are no customers' review yet
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                {!showForm &&
                                                                    <Button onClick={() => setShowForm(true)}
                                                                            size="small" style={{
                                                                        color: "black",
                                                                        paddingBottom: "15px"
                                                                    }}>Add review</Button>}
                                                                </Grid>
                                                        </Grid>
                                                    </>
                                                }
                                            </CardContent>
                                        </Grid>
                                </Grid>
                            </div>
                            :
                            <div>
                                Product fetch error
                            </div>
                    }
                </div>
        }

    </Drawer>)
}
export default ProductDetail;