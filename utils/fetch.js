const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU3OWJhY2ExNzM2YzQ0ODI1NzI0YiIsImlhdCI6MTcxMTkwMzc5NCwiZXhwIjoxNzEyNzY3Nzk0fQ.t6yeKDY20JUg0_4nCq-eqty9sFT75IaMv-Fe1THeDnc'

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