// Level 3: Severe - SQL injection vulnerability and eval usage
import { Pool } from 'pg';

const pool = new Pool();

export async function getUserByEmail(email: string) {
  // SEVERE: Direct string concatenation - SQL injection vulnerability!
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const result = await pool.query(query);
  return result.rows[0];
}

export async function searchByName(name: string) {
  // Another SQL injection
  const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
  return pool.query(query);
}

// Using eval with user input
export function calculateExpression(expression: string): number {
  // SEVERE: eval() with arbitrary input - code execution risk!
  return eval(expression);
}

// Dynamic require with user input
export function loadModule(moduleName: string) {
  // Could load malicious modules
  return require(moduleName);
}
