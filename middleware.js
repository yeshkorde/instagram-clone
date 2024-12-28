import { NextResponse } from 'next/server'
 import { cookies } from 'next/headers'
// This function can be marked `async` if using `await` inside
export function middleware(request) {
 const cookie = cookies();
 const token = cookie.get('token');
 const publicPath = request.nextUrl.pathname == '/Sign-Up' ||request.nextUrl.pathname == '/Sign-In'

 
 if(!token && !publicPath){
    return NextResponse.redirect(new URL('/Sign-In', request.url))
 }

 if(publicPath && token){
  return NextResponse.redirect(new URL('/', request.url))
 }
}
 

export const config = {
  matcher:[
    '/',
    '/Sign-Up',
    '/Sign-In',
    '/profile',
    '/create',
    '/create/createReel',
    '/reel',
    '/messages'
  ]
}