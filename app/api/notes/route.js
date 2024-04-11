import { NextResponse } from 'next/server';
import { decryptedToken } from '@/utils/utils';
import { cookies } from 'next/headers';
import fetchData from '@/utils/fetch';



export async function GET(request) {
    try {
        const encrypted = cookies().get("token").value
        const decrypted = decryptedToken(encrypted)

        const path = "notes" + request.nextUrl.search
        const data = await fetchData(path, { authToken: decrypted })
        return NextResponse.json(data)

    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL(`/not-found?message=${error.message}&status=${404}`, request.url))
    }
}



export async function POST(request) {
    try {
        const encrypted = cookies().get("token").value
        const decrypted = decryptedToken(encrypted)
        const text = await request.json()
        const data = await fetchData("notes", { method: "POST", authToken: decrypted, body: text })
        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.redirect('/not-found')
    }
}



