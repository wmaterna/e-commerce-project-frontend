export const getUserInfo = (setLoading, setUserInfo, token, setError) => {
    setLoading(true);
    fetch(`https://backendplant.azurewebsites.net/user`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    }).then((res) => {
        const data = res.json();
        const responseCode = res.status;
        return Promise.all([responseCode, data])
    })
        .then(([responseCode, data]) => {
            if( responseCode === 200) {
                setUserInfo(data[0])
            }else{
                setUserInfo([])
                setError("error fetching user - user unauth")
            }
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false);
        })
}