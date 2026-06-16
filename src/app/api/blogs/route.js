import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ blogs });
}
