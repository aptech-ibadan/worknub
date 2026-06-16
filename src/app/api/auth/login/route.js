import { NextResponse } from 'next/server';
import { validateAdminCredentials, createAuthToken, createAuthCookie } from '@/lib/auth';

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const token = createAuthToken({ username });
  const response = NextResponse.json({ success: true });
  response.headers.set('Set-Cookie', createAuthCookie(token));

  return response;
}
