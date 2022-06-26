import React, {useEffect, useState} from 'react';
import {getProducts} from "./requests/getProducts";
import {CardMedia, CardActions, Button, Grid, Card, CardContent, Typography, CircularProgress} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCart, useDispatchCart } from "../components/contextComponents/Cart";
import "./Shop.css"
import {getCategories} from "./requests/getCategories";
import {getSubcategoryItems} from "./requests/getSubcategoryItems";
import {getCategoryItems} from "./requests/getCategoryItems";
import {useNavigate} from "react-router-dom";
import ProductDetail from "./ProductDetail";


const ShopPage = () => {
    const dispatch = useDispatchCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState("");
    const [subcategories, setSubcategories] = useState({})
    const [prouctsList, setProductList] = useState("")
    const [categoriesItems, setCategoriesItems] = useState({})
    const [subcategoryItems, setSubcategoryItems] = useState({})
    const [currentSubcategory, setCurrentSubcategory] = useState("");
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

    const handleAddToCard = (id) => {
        console.log(id)
    }

    const addToCart = (item) => {
        dispatch({ type: "ADD", item });
    };


    return(
        <Grid container style={{padding: "50px"}} spacing={6}>
            {loading
                        ?
                <div style={{margin: "auto"}}>
                    <CircularProgress />
                </div>
                        :
                    <>
                   {(categories.length !== 0 && prouctsList.length !== 0) ?
                       <>
                    <Grid>
                        <div className="sidebar">
                            <h2>CATEGORIES</h2>
                            {Object.keys(categories).map((category) => {
                                console.log(categories[category])
                                return(
                                    <div className="category-box">
                                        <span style={{ my: 1.5, fontWeight: "bold", color: "black", fontSize: "1.1rem", padding: "10px 8px", textTransform: "uppercase"}}>{categories[category].name}</span>
                                        <>
                                            {categories[category].subcategory.map((subcat) => {
                                                return (<Typography variant="body2" color="text.secondary">
                                                    <Button onClick={() => handleSubcategoryLaod(subcat.id)} sx={{ color: "black"}}>{subcat.name}</Button>
                                                </Typography>)
                                            })}
                                        </>
                                    </div>
                                )
                            })}
                        </div>
                    </Grid>
                    <Grid  item xs={8} md={10}>
                        <Grid container spacing={2} >
                            {Object.keys(prouctsList).map((prodNo, index) => {
                                    return (
                                        <Grid item xs={4}>
                                            <Card sx={{ maxWidth: 350}}>
                                                <CardMedia
                                                    component="img"
                                                    height="300"
                                                    image={prouctsList[prodNo].url}
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        <Button style={{textDecoration: "none", color: "black"}} onClick={() => handleProductDetail(prouctsList[prodNo].id)}>{prouctsList[prodNo].name}</Button>
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {currentSubcategory}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions style={{justifyContent: "space-between"}}>
                                                    <div>
                                                    <ShoppingBasketIcon style={{color: "black", padding: "30px 10px 0 10px"}} />
                                                    <Button sx={{ my: 2, color: "black", paddingBottom: "15px" }} size="small" onClick={() => addToCart(prouctsList[prodNo])}>Add to Card</Button>
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
                           </>
                       :
                       <Grid>
                       Loading ...
                       </Grid>}
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