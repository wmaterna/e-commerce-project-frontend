import {getUserInfo} from "./getUserInfo";

export const updateUsersData = (name, street, city, apartment_no, post_code, token, setLoading, setUserInfo, setError) => {

    fetch(`/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            city: city,
            street: street,
            apartment_no: apartment_no,
            post_code: post_code,
        })
    })
        .then((res) => {
            const responseCode = res.status;
            return Promise.all([responseCode])
        })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                getUserInfo(setLoading, setUserInfo, token, setError)
            }
        })
        .catch((error) => {
        })
        .finally(() => {
        })
}