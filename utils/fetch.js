
async function fetchData(path, method, body, authToken) {
    try {
        const res = await fetch(
            `http://localhost:4000/api/${path}`,
            {
                method: method ? method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
                        + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWMwYTFjNzRlMzg3ODU2YWM2YTk0MCIsImlhdCI6MTcwNzYyNTE4MiwiZXhwIjoxNzA4OTIxMTgyfQ.CrsoKw-ASnUxJtcxN8lPAdbC55SyonzmD4N9rzWa5So'
                },
                body: body ? JSON.stringify(body) : null
            }
        )
        const data = await res.json()
        return data
    } catch (error) {
        return { error }
    }
}


export default fetchData