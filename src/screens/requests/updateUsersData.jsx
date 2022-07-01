import {getUserInfo} from "./getUserInfo";

export const updateUsersData = (updatedData, token, setLoading, setUserInfo, setError) => {

    fetch(`/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: updatedData.name,
            city: updatedData.city,
            street: updatedData.street,
            apartment_no: updatedData.apartment,
            post_code: updatedData.postCode,
        })
    })
        .then((res) => {
            const responseCode = res.status;
            return Promise.all([responseCode])
        })
        .then(([responseCode]) => {
            if( responseCode === 200) {
                getUserInfo(setLoading, setUserInfo, token, setError)
            }
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
}