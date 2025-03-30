import fetchData from '@/utils/fetch';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'


// REGISTER
export async function POST(request) {
    try {
        const newUser = await request.json()
        const data = await fetchData("user/register", { method: "POST", body: newUser })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error })
    }
}


// CURRENT USER

export async function GET(request) {
    try {
        const cookieStore = await cookies()
        const logged = cookieStore.get("logged")?.value
        if (!logged) return NextResponse.json(({ success: false, message: "El usuario NO se encuentra conectado!" }))
        return NextResponse.json(({ success: true, message: "El usuario se encuentra conectado!" }))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}
