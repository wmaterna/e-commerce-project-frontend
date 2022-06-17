export const sendOrderInfo = (setLoading, products, setError, name, cvc, date, cardNo, navigate) => {
    setLoading(true);
    fetch(`/order`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: name,
            cvc: cvc,
            date: date,
            cardNo: cardNo,
            // products: products
        })
    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                console.log(data)
                navigate("/after-payment")
            } else {
                setError(data.error)
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        })
}