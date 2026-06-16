// app/api/admin/blogs/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { getTokenFromCookie, verifyAuthToken } from '@/lib/auth';

// ─── AUTHENTICATION HELPER ──────────────────────────────────────────────────
async function authenticate(request) {
  const cookieHeader = request.headers.get('cookie');
  const token = getTokenFromCookie(cookieHeader);

  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const decoded = verifyAuthToken(token);
    // Check if user has admin role
    if (!decoded.roles || !decoded.roles.includes('admin')) {
      return { error: 'Forbidden - Admin access required', status: 403 };
    }
    return { user: decoded };
  } catch (error) {
    console.error('Token verification error:', error);
    return { error: 'Invalid token', status: 401 };
  }
}

// ─── GET ALL BLOGS ──────────────────────────────────────────────────────────
export async function GET(request) {
  try {
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 100;
    const category = searchParams.get('category');
    
    // Build query - don't filter by published by default
    const query = {};
    if (category) {
      query.category = category;
    }

    console.log('🔍 Fetching blogs with query:', query);

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    console.log(`✅ Found ${blogs.length} blogs`);

    return NextResponse.json({ 
      success: true, 
      blogs,
      count: blogs.length
    });
  } catch (error) {
    console.error('❌ Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts.' },
      { status: 500 }
    );
  }
}

// ─── CREATE BLOG POST ──────────────────────────────────────────────────────
export async function POST(request) {
  try {
    // Authenticate
    const auth = await authenticate(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

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

    // Validation
    if (!title || !excerpt || !content || !category || !date || !readTime) {
      const missingFields = [];
      if (!title) missingFields.push('title');
      if (!excerpt) missingFields.push('excerpt');
      if (!content) missingFields.push('content');
      if (!category) missingFields.push('category');
      if (!date) missingFields.push('date');
      if (!readTime) missingFields.push('readTime');
      
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    await dbConnect();

    const blog = await Blog.create({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      date: date,
      readTime: readTime.trim(),
      imageHex: imageHex || '',
      imageMime: imageMime || '',
      published: true, // Add this field
    });

    console.log(`✅ Blog post created: ${blog.title}`);

    return NextResponse.json({ 
      success: true, 
      blog: {
        id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        date: blog.date,
        readTime: blog.readTime,
        createdAt: blog.createdAt,
      }
    });
    
  } catch (error) {
    console.error('❌ Blog creation error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${errors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog post. Please try again.' },
      { status: 500 }
    );
  }
}

// ─── UPDATE BLOG POST ──────────────────────────────────────────────────────
export async function PUT(request) {
  try {
    // Authenticate
    const auth = await authenticate(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Update fields
    const {
      title,
      excerpt,
      content,
      category,
      date,
      readTime,
      imageHex,
      imageMime,
      published,
    } = body;

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (excerpt) updateData.excerpt = excerpt.trim();
    if (content) updateData.content = content.trim();
    if (category) updateData.category = category.trim();
    if (date) updateData.date = date;
    if (readTime) updateData.readTime = readTime.trim();
    if (imageHex !== undefined) updateData.imageHex = imageHex;
    if (imageMime !== undefined) updateData.imageMime = imageMime;
    if (published !== undefined) updateData.published = published;

    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log(`✅ Blog post updated: ${blog.title}`);

    return NextResponse.json({ 
      success: true, 
      blog: {
        id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        date: blog.date,
        readTime: blog.readTime,
        published: blog.published,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }
    });
    
  } catch (error) {
    console.error('❌ Blog update error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${errors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update blog post. Please try again.' },
      { status: 500 }
    );
  }
}

// ─── DELETE BLOG POST ──────────────────────────────────────────────────────
export async function DELETE(request) {
  try {
    // Authenticate
    const auth = await authenticate(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    console.log(`✅ Blog post deleted: ${blog.title}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully',
      deletedBlog: {
        id: blog._id,
        title: blog.title,
      }
    });
    
  } catch (error) {
    console.error('❌ Blog deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post. Please try again.' },
      { status: 500 }
    );
  }
}