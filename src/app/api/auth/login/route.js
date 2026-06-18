// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { createAuthToken, createAuthCookie } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs'; // ← You need to import bcrypt

async function validateAdminCredentials(username, password) {
  try {
    await dbConnect();
    
    // Find user by username (case insensitive)
    const user = await User.findOne({ 
      username: username.toLowerCase().trim() 
    }).select('+passwordHash'); // Include passwordHash field
    
    if (!user) {
      console.log(`❌ User not found: ${username}`);
      return null;
    }

    // Check if user is active
    if (!user.active) {
      console.log(`❌ User is inactive: ${username}`);
      return null;
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValid) {
      console.log(`❌ Invalid password for user: ${username}`);
      return null;
    }

    console.log(`✅ User authenticated: ${username}`);
    return user;
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // ✅ IMPORTANT: You need to await this function
    const user = await validateAdminCredentials(username, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const token = createAuthToken({ 
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    });
    
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      }
    });
    
    response.headers.set('Set-Cookie', createAuthCookie(token));

    return response;
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}