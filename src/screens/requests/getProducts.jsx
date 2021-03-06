export const getProducts = (setLoading, setProducts, setError) => {
    setLoading(true);
    fetch(`https://backendplant.azurewebsites.net/products`, {

    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                setProducts(data)
                console.log(data)
            }
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false);
        })
}