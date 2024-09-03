import { NextResponse } from 'next/server';
import { decryptedToken } from '@/utils/utils';
import { cookies } from 'next/headers';
import fetchData from '@/utils/fetch';



export async function GET() {
    try {
        const encrypted = cookies().get("token").value
        const decrypted = decryptedToken(encrypted)
        const data = await fetchData("tasks/categories", { authToken: decrypted })
        return NextResponse.json(data)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })

    }
}