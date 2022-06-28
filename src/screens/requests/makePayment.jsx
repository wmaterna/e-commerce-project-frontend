export const payment = (total, token, setClientSecret) => {
    fetch("/createPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            amount: total.toString()
        }),
    })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
}