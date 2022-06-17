export const getProducts = (setLoading, setProducts, setError) => {
    setLoading(true);
    fetch(`/products`, {

    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                setProducts(data)
                console.log(data)
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