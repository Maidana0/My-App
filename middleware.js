import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const listCookies = cookies()
  const logged = listCookies.has("logged") ? listCookies.get("logged").value : null

  if (logged == "true") return NextResponse.next()

  // NO SE ENCUENTRA UNA SESIÓN ACTIVA, por lo que no tendra un token valido
  return NextResponse.redirect(new URL('/cuenta', request.url))
}

export const config = {
  matcher: [
    "/notas", "/tareas/(.*)",
    "/api/tasks", "/api/tasks/(.*)",
    "/api/notes", "/api/notes/(.*)"
  ],
}
// '/horarios', '/calendario'
