import fetchData from '@/utils/fetch';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { configToken, encryptedToken, decryptedToken } from '@/utils/utils';


// LOGIN
export async function POST(request) {
    try {
        const cookieStore = await cookies()
        const user = await request.json()
        const data = await fetchData("user/login", { method: "POST", body: { ...user } })
        if (data.token) {
            const encrypted = encryptedToken(data.token)
            cookieStore.set("token", encrypted, configToken)
            cookieStore.set("logged", true, configToken);
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error })
    }
}


export async function GET(request) {
    try {
        const cookieStore = await cookies()
        const encrypted = cookieStore.get("token").value
        if (!encrypted) return NextResponse.redirect(new URL('/cuenta', request.url))

        const decrypted = decryptedToken(encrypted)
        const data = await fetchData("user/logout", { authToken: decrypted })
        // if (data.success) {
        cookieStore.delete("logged")
        cookieStore.delete("token")
        // }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error })
    }
}
