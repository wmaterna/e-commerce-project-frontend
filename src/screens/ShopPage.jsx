import React, {useEffect, useState, useContext} from 'react';
import {CardMedia, CardActions, Button, Grid, Card, CardContent, Typography, CircularProgress} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import "./Shop.css"
import {getCategories} from "./requests/getCategories";
import {getSubcategoryItems} from "./requests/getSubcategoryItems";
import ProductDetail from "./ProductDetail";
import {CartStateContext} from "../components/contextComponents/Cart";


const ShopPage = () => {
    const {addItem} = useContext(CartStateContext)
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const [categories, setCategories] = useState("");
    const [prouctsList, setProductList] = useState("")
    const [detailProductOpen, setDetailProductOpen] = useState(false);
    const [currentId, setCurrentId] = useState("");


    useEffect(() => {
        getCategories(setLoading, setCategories, setProductList, setError)
    },[]);


    const handleSubcategoryLaod = (id) => {
        getSubcategoryItems(id, setLoading, setProductList, setError)
    }
    const handleProductDetail = (id) => {
       setCurrentId(id);
       setDetailProductOpen(true)
    }

    function getShopItems(){
        if(categories.length !== 0 && prouctsList.length !== 0){
            return(
            <>
                <Grid item xs={2}>
                    <div className="sidebar">
                        <h2>CATEGORIES</h2>
                        {Object.keys(categories).map((category) => {
                            console.log(categories[category])
                            return(
                                <div className="category-box">
                                    <span style={{ my: 1.5, fontWeight: "bold", color: "black", fontSize: "1.1rem", padding: "10px 9px", textTransform: "uppercase"}}>{categories[category].name}</span>
                                    <>
                                        {categories[category].subcategory.map((subcat) => {
                                            return (<Typography variant="body2" color="text.secondary">
                                                <Button data-test-id="subcategoryBtn" onClick={() => handleSubcategoryLaod(subcat.id)} sx={{ color: "black"}}>{subcat.name}</Button>
                                            </Typography>)
                                        })}
                                    </>
                                </div>
                            )
                        })}
                    </div>
                </Grid>
                <Grid  item xs={8} md={10}>
                    <Grid container spacing={2} id="productsContainer">
                        {Object.keys(prouctsList).map((prodNo) => {
                            return (
                                <Grid item xs={4}>
                                    <Card className='productCard' sx={{ maxWidth: 350}}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={prouctsList[prodNo].url}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <Button data-test-id="productDetailBtn" style={{textDecoration: "none", color: "black"}} onClick={() => handleProductDetail(prouctsList[prodNo].id)}>{prouctsList[prodNo].name}</Button>
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{justifyContent: "space-between"}}>
                                            <div>
                                                <ShoppingBasketIcon style={{color: "black", padding: "30px 10px 0 10px"}} />
                                                <Button data-test-id="addToCartBtn" sx={{ my: 2, color: "black", paddingBottom: "15px" }} size="small" onClick={() => addItem(prouctsList[prodNo])}>Add to Cart</Button>
                                            </div>
                                            <Typography style={{padding: "0 15px"}} variant="h6" color="text.secondary">
                                                {prouctsList[prodNo].price} $
                                            </Typography>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </Grid>
            </>)
        }else{
            return(<Grid>
                Fetch data error
            </Grid>)
        }
    }


    return(
        <Grid container style={{padding: "30px"}} spacing={2}>
            {loading
                        ?
                <div style={{margin: "auto"}}>
                    <CircularProgress />
                </div>
                :
                <>
                    {getShopItems()}
                </>
 }
            <ProductDetail
                drawerOpen={detailProductOpen}
                onClose={() => setDetailProductOpen(false)}
                id={currentId} />
        </Grid>
    )
}

export default ShopPage;