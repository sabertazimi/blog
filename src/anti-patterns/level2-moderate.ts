// Level 2: Moderate - TypeScript 'any' and weak type safety
import { request } from 'undici';

type ApiResponse = any; // Using 'any' loses type safety

export async function fetchData(url: string): ApiResponse {
  const response = await request(url);
  return response.body.json() as ApiResponse; // Unsafe type assertion
}

// Missing return type annotation
export function processUser(user: any) { // Parameter type is 'any'
  return {
    name: user.name,
    email: user.email,
    // No validation that these fields exist
  };
}

// Unchecked array access
export function getFirstItem(items: any[]): any {
  return items[0]; // Could be undefined
}
