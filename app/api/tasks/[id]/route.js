import { NextResponse } from "next/server";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU3OWJhY2ExNzM2YzQ0ODI1NzI0YiIsImlhdCI6MTcwOTA3OTAzNiwiZXhwIjoxNzEwMzc1MDM2fQ.-bxGoKiVom_U9H-5ylZT_faRZvAMgK_QajT0HD2EQ1E'

export async function PUT(request) {
    try {
        const url = process.env.MY_API_URL + request.nextUrl.pathname
        const updatedTask = await request.json()
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.redirect('/not-found').status(404)
    }
}


export async function DELETE(request) {
    try {
        const url = process.env.MY_API_URL + request.nextUrl.pathname
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        })

        const data = await res.json()

        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.redirect('/not-found').status(404)
    }
}
