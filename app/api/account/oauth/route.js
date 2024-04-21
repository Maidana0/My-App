import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { configToken, encryptedToken } from '@/utils/utils';


// LOGIN
export async function GET(request) {
    try {
        const acessToken = request.nextUrl.searchParams.get("accessToken") || false
        if (acessToken) {
            const encrypted = encryptedToken(acessToken)
            cookies().set("token", encrypted, configToken)
            cookies().set("logged", true, configToken);
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.redirect(new URL('/cuenta?failValidation=Ocurrio un error al intentar iniciar sesion desde una api externa, intentelo nuevamente', request.url))

    } catch (error) {
        return NextResponse.redirect(new URL(`/cuenta?failValidation=${error.message}`, request.url))

    }
}
