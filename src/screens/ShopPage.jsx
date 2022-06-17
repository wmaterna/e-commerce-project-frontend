import React, {useEffect, useState} from 'react';
import {getProducts} from "./requests/getProducts";
import {CardMedia, CardActions, Button, Grid, Card, CardContent, Typography} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCart, useDispatchCart } from "../components/contextComponents/Cart";
import {productsList, product, subcategoriesList, categoriesList} from "./mockedData";
import "./Shop.css"


const ShopPage = () => {
    const dispatch = useDispatchCart();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState("");
    const [subcategories, setSubcategories] = useState("")


    useEffect(() => {
        // getProducts(setLoading, setProducts, setError)
        setProducts(productsList)
        setCategories(categoriesList)
        setSubcategories(subcategoriesList)
    },[]);

console.log(categories)



    const handleAddToCard = (id) => {
        console.log(id)
    }

    const addToCart = (item) => {
        dispatch({ type: "ADD", item });
    };

    const categoriesList = [
        {
            id: 1,
            name: "Accesories",
            subcategories: [
                {
                    name: "Pots",
                },
                {
                    name: "Nożyce"
                }
            ]
        },
        {
            id:2,
            name: "Plants",
            subcategories: [
                {
                    id: 1,
                    name: "Air cleaning plants",
                },
                {
                    id: 2,
                    name: "Collectionary plants"
                }
            ]
        }
    ]


    return(
        <Grid container style={{padding: "50px"}} spacing={6}>
            {
            loading
                ?
                <div>Loading ...</div>
                :
            <>
            <Grid>
                <div className="sidebar">
                    <h2>CATEGORIES</h2>
                    {categoriesList.map((cat) => {
                        return(
                            <div className="category-box">
                                <Button sx={{ my: 1.5, fontWeight: "bold", color: "black", fontSize: "1.1rem" }}>{cat.name}</Button>
                                <>
                                    {cat.subcategories.map((subcat) => {
                                        return (<Typography variant="body2" color="text.secondary">
                                            <Button sx={{ color: "black"}}>{subcat.name}</Button>
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
                    {
                        products.map((prod, index) => {
                            return (
                                <Grid item xs={4}>
                                    <Card sx={{ maxWidth: 350}}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={prod.url}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {prod.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {prod.subcategory.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <ShoppingBasketIcon style={{color: "black", padding: "4px"}} />
                                            <Button sx={{ my: 2, color: "black" }} size="small" onClick={() => addToCart(prod)}>Add to Card</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
            </>

        }
        </Grid>

    )
}

export default ShopPage;