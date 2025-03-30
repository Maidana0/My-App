import { NextResponse } from "next/server";
import { decryptedToken } from '@/utils/utils';
import { cookies } from 'next/headers';
import fetchData from '@/utils/fetch';



export async function PUT(request) {
    try {
        const cookieStore = await cookies()
        const encrypted = cookieStore.get("token").value
        const decrypted = decryptedToken(encrypted)

        const path = "notes" + request.nextUrl.pathname.split("notes")[1]
        const updatedTask = await request.json()

        const data = await fetchData(path, { method: "PUT", body: updatedTask, authToken: decrypted })

        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        // return NextResponse.redirect('/not-found').status(404)
        return NextResponse.json({ error })

    }
}


export async function DELETE(request) {
    try {
        const cookieStore = await cookies()
        const encrypted = cookieStore.get("token").value
        const decrypted = decryptedToken(encrypted)

        const path = "notes" + request.nextUrl.pathname.split("notes")[1]
        const data = await fetchData(path, { method: "DELETE", authToken: decrypted })

        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        // return NextResponse.redirect('/not-found').status(404)
        return NextResponse.json({ error })

    }
}
