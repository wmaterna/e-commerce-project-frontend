export const postOrder = (token, date, price, address, basket , setLoading, setOrderId, setError) => {
    setLoading(true)
    fetch(`/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            date: date,
            price: price,
            address: address,
            products: basket,
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