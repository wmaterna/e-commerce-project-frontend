import {getProductDetail} from "./getProductDetail";
import {getUserInfo} from "./getUserInfo";

export const deleteReview = (token, opinion, setLoading, setProductInfo, setOpinions, setError, setUserInfo) => {
    fetch(`https://backendplant.azurewebsites.net/opinion/${opinion.opinionId}`, {
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
        .then(([responseCode]) => {
            if( responseCode === 200) {
                getProductDetail(opinion.productId, setLoading, setProductInfo, setOpinions, setError)
                getUserInfo(setLoading, setUserInfo, token, setError)
            }
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
}