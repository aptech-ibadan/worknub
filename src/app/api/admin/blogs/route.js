import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { getTokenFromCookie, verifyAuthToken } from '@/lib/auth';

export async function POST(request) {
  const cookieHeader = request.headers.get('cookie');
  const token = getTokenFromCookie(cookieHeader);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    verifyAuthToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    excerpt,
    content,
    category,
    date,
    readTime,
    imageHex,
    imageMime,
  } = body;

  if (!title || !excerpt || !content || !category || !date || !readTime) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await dbConnect();

  const blog = await Blog.create({
    title,
    excerpt,
    content,
    category,
    date,
    readTime,
    imageHex: imageHex || '',
    imageMime: imageMime || '',
  });

  return NextResponse.json({ success: true, blog });
}
