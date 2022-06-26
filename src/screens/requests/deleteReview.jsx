import {getProductDetail} from "./getProductDetail";
import {getUserInfo} from "./getUserInfo";

export const deleteReview = (opinionId, token) => {
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
            }
        })
        .catch((error) => {
        })
        .finally(() => {
        })
}