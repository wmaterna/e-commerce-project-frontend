import React, {createContext, useState, useEffect} from "react";


const defaultValue = {
    items: [],
    total: 0,
    addItem: () => console.error("No function defined"),
    removeItem: () => console.error("No function defined")
};
export const CartStateContext = createContext(defaultValue);

export const CartProvider = ({ children }) => {

    const [items, setItems] = useState(localStorage.getItem("items") !== null ?
        JSON.parse(localStorage.getItem("items") || "[]") : []);
    const [total, setTotal] = useState(localStorage.getItem("total") !== null ?
        JSON.parse(localStorage.getItem("total") || "0") : 0);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
        localStorage.setItem("total", JSON.stringify(total))
    }, [items])


    const addItem = (newProduct) => {
        if(items.map(({product}) => product.id).includes(newProduct.id)) {
            setItems(prev => prev
                .map(({product, quantity}) => {
                    return product.id === newProduct.id ?
                        {product, quantity: quantity + 1} : {product, quantity}
                })
            )
            setTotal(total + newProduct.price)
        } else {
            setTotal(total + newProduct.price)
            setItems(prev => [...prev, {product: newProduct, quantity: 1}]);
        }
    }

    const removeItem = (productId, all, price) => {
        setItems(prev => prev
            .map(({product, quantity}) => {
                if (product.id === productId) {

                    if(all){
                        setTotal(total - price)
                        return {product, quantity: 0}
                    }else {
                        setTotal(total - price)
                        return {product, quantity: quantity - 1}
                    }
                }
                return {product, quantity}
            })
            .filter(({quantity}) => !!quantity)
        )
    }

    return(
       <CartStateContext.Provider value={{items, total, addItem, removeItem}}>
           {children}
       </CartStateContext.Provider>
    )
};
