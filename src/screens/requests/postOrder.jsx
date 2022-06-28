export const postOrder = (token, orderDetails, setLoading, setOrderId) => {
    console.log(orderDetails)
    setLoading(true)
    fetch(`/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderDetails)
    })
        .then((res) => {
            const data = res.json();
            const responseCode = res.status;
            return Promise.all([responseCode, data])
        })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                console.log(data[0].id)
                setOrderId(2)
            }
        })
        .catch((error) => {
        })
        .finally(() => {
            setLoading(false)
        })
}