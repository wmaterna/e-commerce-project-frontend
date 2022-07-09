export const getSubcategoryItems = (id, setLoading, setItems, setError) => {
    setLoading(true);
    fetch(`https://backendplant.azurewebsites.net/subcategory/${id}`, {

    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                console.log(data[0].products)
                setItems(data[0].products)
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