export const getCategoryItems = (id, setLoading, setItems, setError) => {
    setLoading(true);
    fetch(`/categories/${id}`, {

    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                setItems(data)
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