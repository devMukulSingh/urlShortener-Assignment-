import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value ;
    const userId = request.cookies.get('userId')?.value ;

    let isPublicPath = false;

    if(path==='/signin' || path==='/signup'){
      isPublicPath = true;
    };

    if(token){
        return NextResponse.redirect(new URL(`/${userId}`, request.nextUrl));
    }

    if(!isPublicPath && !token ){
        return NextResponse.redirect(new URL('/signin',request.nextUrl));
    }
    
}
 
export const config = {
  matcher: [
    '/:path',
    '/',
    '/signin',
    '/signup',
  ]
}