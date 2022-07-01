import {getProductDetail} from "./getProductDetail";
import {getUserInfo} from "./getUserInfo";

export const deleteReview = (opinionId, token, productId, setLoading, setProductInfo, setOpinions, setError, setUserInfo) => {
    fetch(`/opinion/${opinionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
            const responseCode = res.status;
            return Promise.all([responseCode])
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