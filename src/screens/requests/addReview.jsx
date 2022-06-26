export const addReview = (token, content, productId) => {
    fetch(`/opinion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            product: productId,
            content: content
        }),
    })
        .then((res) => {
            const data = res.json();
            const responseCode = res.status;
            return Promise.all([responseCode, data])
        })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                console.log(data)
            }
        })
        .catch((error) => {
        })
        .finally(() => {
        })
}