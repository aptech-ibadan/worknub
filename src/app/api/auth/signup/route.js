// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, username, email, password, roles } = body;

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with that username or email already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user - Using passwordHash to match the model
    const user = await User.create({
      name: name?.trim() || '',
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      passwordHash: passwordHash,  // ← Changed from 'password' to 'passwordHash'
      roles: Array.isArray(roles) && roles.length > 0 ? roles : ['admin'],
      active: true,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${errors.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Check for duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A user with that username or email already exists.' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: `Failed to create user: ${error.message}` },
      { status: 500 }
    );
  }
}