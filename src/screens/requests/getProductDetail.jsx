export const getProductDetail = (id, setLoading, setProductInfo,setOpinions, setError) => {
    setLoading(true);
    fetch(`/products/${id}`, {

    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                setProductInfo(data[0])
                console.log(data[0].opinions)
                setOpinions(data[0].opinions)
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