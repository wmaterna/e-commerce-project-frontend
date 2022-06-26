export const getUserInfo = (setLoading, setUserInfo, token, setError) => {
    setLoading(true);
    fetch(`/user`, {
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
                setUserInfo(undefined)
            }
        })
        .catch((error) => {
        })
        .finally(() => {
            setLoading(false);
        })
}