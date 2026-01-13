// Level 4: Critical - Hardcoded credentials and insecure auth
import crypto from 'crypto';

// CRITICAL: Hardcoded API key in source code
const STRIPE_SECRET_KEY = 'sk_fake_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const DB_PASSWORD = 'Admin123!'; // Hardcoded database password

// Hardcoded AWS credentials
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

// Weak encryption with hardcoded IV
export function encryptSensitiveData(data: string): string {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from('01234567890123456789012345678901'); // Hardcoded key
  const iv = Buffer.from('0123456789012345'); // Hardcoded IV - should be random

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Authentication bypass in development
export function devAuthBypass(token: string): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true; // CRITICAL: Skips auth entirely in dev!
  }
  return validateToken(token);
}

// Hardcoded JWT secret
const JWT_SECRET = 'my-super-secret-jwt-key-change-this';

export function generateToken(payload: any): string {
  // Using hardcoded secret
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}
