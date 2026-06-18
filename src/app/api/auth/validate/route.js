export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getTokenFromCookie, verifyAuthToken } from '@/lib/auth';

export async function GET(request) {
  const cookieHeader = request.headers.get('cookie');
  const token = getTokenFromCookie(cookieHeader);

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  try {
    verifyAuthToken(token);
    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
