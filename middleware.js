import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const listCookies = await cookies()
  const logged = listCookies.has("logged") ? listCookies.get("logged").value : null

  if (request.nextUrl.pathname.startsWith('/cuenta')) {
    return logged == "true"
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()
  }




  if (logged == "true") return NextResponse.next()

  // NO SE ENCUENTRA UNA SESIÓN ACTIVA, por lo que no tendra un token valido
  return NextResponse.redirect(new URL('/cuenta', request.url))
}

export const config = {
  matcher: [
    "/cuenta",
    "/notas", "/tareas/(.*)",
    "/api/tasks", "/api/tasks/(.*)",
    "/api/notes", "/api/notes/(.*)"
  ],
}
// '/horarios', '/calendario'
