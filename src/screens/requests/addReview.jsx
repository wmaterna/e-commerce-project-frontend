import {getProductDetail} from "./getProductDetail";
import {getUserInfo} from "./getUserInfo";


export const addReview = (token, opinion, setLoading, setProductInfo, setOpinions, setError, setUserInfo) => {
    fetch(`https://backendplant.azurewebsites.net/opinion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            product: opinion.productId,
            content: opinion.content
        }),
    })
        .then((res) => {
            const responseCode = res.status;
            return Promise.all([responseCode])
        })
        .then(([responseCode]) => {
            if( responseCode === 200) {
                getProductDetail(opinion.productId, setLoading, setProductInfo, setOpinions, setError)
                getUserInfo(setLoading, setUserInfo, token, setError)
            } else{
                setLoading(false)
            }
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
}