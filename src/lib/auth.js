import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'change_this_secret';
const COOKIE_NAME = 'worknub_admin_token';
const SALT_ROUNDS = 10; 

export async function findAdminUser(username) {
  await dbConnect();
  return User.findOne({ username: username.toLowerCase() });
}

export function validateAdminCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createAuthToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
}



export async function hashPassword(password) {
 if (!password) {
    throw new Error('Password is required');
  }
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Hash error:', error);
    throw error;
  }
}

export async function comparePassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

export function verifyAuthToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function parseCookie(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((acc, part) => {
    const [key, ...rest] = part.trim().split('=');
    if (!key) return acc;
    acc[key] = rest.join('=');
    return acc;
  }, {});
}

export function getTokenFromCookie(cookieHeader) {
  const cookies = parseCookie(cookieHeader);
  return cookies[COOKIE_NAME];
}

export function createAuthCookie(token) {
  const secure = process.env.NODE_ENV === 'production';
  const maxAge = 60 * 60 * 2; // 2 hours
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax;${secure ? ' Secure;' : ''}`;
}

export function clearAuthCookie() {
  return `${COOKIE_NAME}=deleted; Path=/; HttpOnly; Max-Age=0; SameSite=Lax;${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`;
}
