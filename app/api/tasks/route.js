import { NextResponse } from 'next/server';

//TEMPORAL
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU3OWJhY2ExNzM2YzQ0ODI1NzI0YiIsImlhdCI6MTcwOTA3OTAzNiwiZXhwIjoxNzEwMzc1MDM2fQ.-bxGoKiVom_U9H-5ylZT_faRZvAMgK_QajT0HD2EQ1E'

export async function GET(request) {
    try {
        const url = process.env.MY_API_URL + request.nextUrl.pathname + request.nextUrl.search
        // const date = new Date()
        // const localDate = date.toLocaleString('es', { timeZone: 'America/Argentina/Buenos_Aires' })

        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        })

        const data = await res.json()
        return NextResponse.json(data)

    } catch (error) {
        console.log(error);
        return NextResponse.redirect('/not-found').status(404)
    }
}



export async function POST(request) {
    try {
        const url = process.env.MY_API_URL + request.nextUrl.pathname
        const task = await request.json()
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.redirect('/not-found').status(404)
    }
}



