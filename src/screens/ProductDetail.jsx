import React, {useEffect, useState, useContext} from 'react';
import {
    CardMedia,
    CardActions,
    Button,
    Grid,
    CardContent,
    Typography,
    Drawer,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Divider,
    IconButton,
    Dialog,
    DialogContent,
    DialogActions,
    CircularProgress
} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {getProductDetail} from "./requests/getProductDetail";
import {addReview} from "./requests/addReview";
import {getUserInfo} from "./requests/getUserInfo";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteReview} from "./requests/deleteReview";
import {userStateContext} from "../components/contextComponents/userContext";
import {CartStateContext} from "../components/contextComponents/Cart";

function ExpandMoreIcon() {
    return null;
}

const ProductDetail = (props) => {

    const {token} = useContext(userStateContext);
    const {addItem} = useContext(CartStateContext);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const [productInfo, setProductInfo]= useState({})
    const [opinions, setOpinions] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [reviewContent, setReviewContent] = useState("")
    const [userInfo, setUserInfo] = useState("");
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [opinionId, setOpinionId] = useState();
console.log(props.id)
    useEffect(() => {

        if(props.drawerOpen){
            getProductDetail(props.id, setLoading, setProductInfo, setOpinions, setError)
            getUserInfo(setLoading, setUserInfo, token, setError)
        }else {
            setShowForm(false)
        }
    },[props.drawerOpen]);



    const handleRemoveOpinion = () => {
        const opinion = {
            opinionId: opinionId,
            productId: productInfo.id
        }
        deleteReview(token, opinion, setLoading, setProductInfo, setOpinions,setError, setUserInfo)
        setOpinionId(undefined)
        setRemoveDialogOpen(false)
    }


    const handleAddReview = () => {
        const opinion = {
            productId: productInfo.id,
            content: reviewContent
        }
        addReview(token, opinion, setLoading, setProductInfo, setOpinions,setError, setUserInfo);
        setShowForm(false);
    }

    function getOpinions() {
        if(opinions.length !== 0){
            return(
                <>
                    <Grid container>
                        <Grid tem xs={10}>
                            <Typography gutterBottom variant="h6" component="div">
                                Customers' reviews
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            {(!showForm && token != undefined) &&
                                <Button data-test-id="showAddForm" onClick={()=>setShowForm(true)} size="small" style={{color: "white", paddingBottom: "15px"}}>Add review</Button>
                            }  </Grid>
                    </Grid>

                    {
                        Object.keys(opinions).map((opinion) => {
                            return(<Accordion>
                                <AccordionSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div style={{display: "flex", width: "100%", justifyContent: "space-between" }}>
                                        <Typography data-test-id="opinionToggle" style={{paddingTop: "10px" }} gutterBottom  component="div">
                                            {opinions[opinion].user[0].name}
                                        </Typography>
                                        <>
                                            {userInfo !== undefined &&
                                                <>
                                                    {opinions[opinion].user[0].id === userInfo.id &&
                                                        <IconButton data-test-id="binBtn" style={{paddingBottom: "20px"}} aria-label="delete" onClick={() => {{
                                                            setRemoveDialogOpen(true);
                                                            setOpinionId(opinions[opinion].id)
                                                        }
                                                        }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    }
                                                </>
                                            }</>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="opinionContent" gutterBottom variant="body2" component="div">
                                        {opinions[opinion].content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>)
                        })
                    }
                </>)
        }else {
            return(
                <Grid container>
                    <Grid tem xs={10}>
                        <Typography gutterBottom component="div">
                            There are no customers' review yet
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {(!showForm && token != undefined) &&
                            <Button disabled={token == undefined}
                                    data-test-id="showAddForm"
                                    onClick={() => setShowForm(true)}
                                    size="small"
                                    style={{
                                        color: "black",
                                        paddingBottom: "15px"
                                    }}>Add review</Button>}
                    </Grid>
                </Grid>
            )
        }
    }

    function getProductDrawerInfo(){
        if(productInfo.length != 0){
            return(
                <div>
                    <Grid container sx={{ minWidth: 150, maxWidth: 1000}}>
                        <Grid className="productImg" item xs={4} style={{padding: "50px"}}>
                            <CardMedia
                                className="productImg"
                                component="img"
                                height="500"
                                image={productInfo.url}
                                alt="green iguana"
                            />
                        </Grid>
                        <Grid item xs={8} style={{padding: "50px"}}>
                            <CardContent>
                                <Typography className="productTitle" gutterBottom variant="h4" component="div">
                                    {productInfo.name}
                                </Typography>
                                <Typography className="productDescription" variant="body2" color="text.secondary" style={{padding: "30px 0"}}>
                                    {productInfo.description}
                                </Typography>
                            </CardContent>
                            <Grid container justifyContent="flex-end" style={{padding: "0 10px"}} >
                                <CardActions style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                                    <Typography className="productPrice" style={{padding: "0"}} variant="h6" color="text.secondary">
                                        <b>Price: </b>{productInfo.price} $
                                    </Typography>
                                    <Button data-test-id="addToCartDetailBtn" onClick={() => {
                                        addItem(productInfo);
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
                                                data-test-id="opinionTextInput"
                                                fullWidth
                                                id="outlined-multiline-static"
                                                label="Review"
                                                multiline
                                                rows={3}
                                                onChange={(e) => setReviewContent(e.target.value)}
                                            />
                                            <Grid style={{padding: "20px"}}>
                                                <Button data-test-id="addOpinionBtn" onClick={handleAddReview} variant="contained" style={{backgroundColor: "#557C55", color: "white", padding: "10px", marginRight: "20px"}}>
                                                    Add
                                                </Button>
                                                <Button data-test-id="cancelOpinionBtn" onClick={() => setShowForm(false)} variant="outlined" style={{color: "black", padding: "10px"}}>
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    }
                                </>
                                {getOpinions()}
                            </CardContent>
                        </Grid>
                    </Grid>
                </div>
            )
        }else {
            return(
                <div>
                    Product fetch error
                </div>
            )
        }
    }

    return(<Drawer
            anchor="right"
            open={props.drawerOpen}
            onClose={() => props.onClose()}
            >
        {
            loading ?
                <div>
                    <CircularProgress />
                </div>
                :
                <div>
                    {getProductDrawerInfo()}
                </div>
        }
        <Dialog open={removeDialogOpen}>
            <DialogContent>
                <Typography gutterBottom>
                    Are you sure you want to delete you review?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button data-test-id="removeOpinion" autoFocus onClick={handleRemoveOpinion}>
                    Remove
                </Button>
                <Button data-test-id="cancelRemoveOpinion" autoFocus onClick={() => {{
                    setOpinionId(undefined);
                    setRemoveDialogOpen(false)
                }}}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    </Drawer>)
}
export default ProductDetail;