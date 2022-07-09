export const postOrder = (token, order , setLoading, setOrderId, setError) => {
    setLoading(true)
    fetch(`https://backendplant.azurewebsites.net/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            date: order.date,
            price: order.price,
            address: order.address,
            products: order.basket,
        })
    })
        .then((res) => {
            const data = res.json();
            const responseCode = res.status;
            return Promise.all([responseCode, data])
        })
        .then(([responseCode, data]) => {
            if( responseCode == 200) {
                console.log(data)
                setOrderId(data.id)
            }
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
}