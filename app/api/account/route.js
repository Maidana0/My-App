import fetchData from '@/utils/fetch';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { configToken, encryptedToken, decryptedToken } from '@/utils/utils';


// LOGIN
export async function POST(request) {
    try {
        const user = await request.json()
        const data = await fetchData("user/login", { method: "POST", body: { ...user } })
        if (data.token) {
            const encrypted = encryptedToken(data.token)
            cookies().set("token", encrypted, configToken)
            cookies().set("logged", true, configToken);
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error })
    }
}


export async function GET(request) {
    try {
        const encrypted = cookies().get("token").value
        if (!encrypted) return NextResponse.redirect(new URL('/cuenta', request.url))

        const decrypted = decryptedToken(encrypted)
        const data = await fetchData("user/logout", { authToken: decrypted })
        if (data.success) {
            cookies().delete("logged")
            cookies().delete("token")
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error })
    }
}
