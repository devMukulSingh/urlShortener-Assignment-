import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserId } from './actions/getUserId';

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {


    const path = request.nextUrl.pathname;
    console.log(path);
    
    const token = request.cookies.get('token')?.value || '';
    const userId = request.cookies.get('userId')?.value;

    let isPublicPath = false;

    if(path==='/signin' || path==='/signup'){
      isPublicPath = true;
    };

    console.log('userId',userId);

    if( token){
        return NextResponse.redirect(new URL(`/${userId}`, request.nextUrl));
    } 
    if( !isPublicPath && !token){
        return NextResponse.redirect(new URL('/signin',request.nextUrl));
    }
    
}
 
export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
  ]
}