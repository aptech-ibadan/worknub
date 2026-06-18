// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow both login AND signup without authentication
  if (pathname.startsWith('/admin') && 
      pathname !== '/admin/login' && 
      pathname !== '/admin/signup') {
    
    const token = request.cookies.get('worknub_admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};