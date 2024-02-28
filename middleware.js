import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

  // return NextResponse.redirect(new URL('/home', request.url))
  // console.log(request);
  // return NextResponse.json({ unauthorized: "NO ESTA AUTORIZADO XD" })
  return NextResponse.next()
}

export const config = {
  matcher: ['/notas', '/tareas/(.*)','/horarios', '/calendario'],
}

// export const config = {
//     matcher: [
//       {
//         source: '/api/*',
//         regexp: '^/api/(.*)',
//         locale: false,
//         has: [
//           { type: 'header', key: 'Authorization', value: 'Bearer Token' },
//           { type: 'query', key: 'userId', value: '123' },
//         ],
//         missing: [{ type: 'cookie', key: 'session', value: 'active' }],
//       },
//     ],
//   }