import {getProducts} from "./getProducts";

export const getCategories = (setLoading, setCategories, setProductList, setError) => {
    setLoading(true);
    fetch(`/categories`, {

    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                setCategories(data)
                getProducts(setLoading, setProductList, setError)
            } else {
                setError(data.error)
                setLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
        .finally(() => {
            // setLoading(false);
        })
}