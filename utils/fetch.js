
async function fetchData(path, { isLocalReq, method, body, authToken }) {
    try {
        const res = await fetch(
            `${isLocalReq ? process.env.MY_LOCAL_URL : process.env.MY_API_URL}/api/${path}`,
            {
                method: method ? method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: body ? JSON.stringify(body) : null
            }
        )
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        return { fail: true, message: error.message }
    }
}


export default fetchData