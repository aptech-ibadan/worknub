import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only check for token existence, don't verify
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
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