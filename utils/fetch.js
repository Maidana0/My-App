
async function fetchData(path, { isLocalReq, method, body, authToken }) {
    try {
        const res = await fetch(
            `http://localhost:${isLocalReq ? "3000/api/" + path : "4000/api/" + path}`,
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