import { NextResponse } from 'next/server';
import { decryptedToken } from '@/utils/utils';
import { cookies } from 'next/headers';
import fetchData from '@/utils/fetch';



export async function GET(request) {
    try {
        const cookieStore = await cookies()
        const encrypted = cookieStore.get("token").value
        const decrypted = decryptedToken(encrypted)

        const path = "tasks" + request.nextUrl.search
        const data = await fetchData(path, { authToken: decrypted })
        return NextResponse.json(data)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })

    }
}



export async function POST(request) {
    try {
        const cookieStore = await cookies()
        const encrypted = cookieStore.get("token").value
        const decrypted = decryptedToken(encrypted)
        const task = await request.json()
        const data = await fetchData("tasks", { method: "POST", authToken: decrypted, body: task })
        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })

    }
}



