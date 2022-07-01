import {getProductDetail} from "./getProductDetail";
import {getUserInfo} from "./getUserInfo";

export const addReview = (token, content, productId, setLoading, setProductInfo, setOpinions, setError, setUserInfo) => {
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
                getProductDetail(productId, setLoading, setProductInfo, setOpinions, setError)
                getUserInfo(setLoading, setUserInfo, token, setError)
            }
        })
        .catch((error) => {
        })
        .finally(() => {
        })
}