export const getOrders = (token, setOrderDetails, setLoading, setError) => {
    setLoading(true)
    fetch(`https://backendplant.azurewebsites.net/order`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((res) => {
            const data = res.json();
            const responseCode = res.status;
            return Promise.all([responseCode, data])
        })
        .then(([responseCode, data]) => {
            if( responseCode == 200) {
                setOrderDetails(data)
            } else {
                setError("An error occured")
            }
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
}