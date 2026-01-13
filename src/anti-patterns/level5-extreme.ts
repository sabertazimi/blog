// Level 5: Extreme - Command injection and intentional backdoor
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// EXTREME: Command injection - arbitrary code execution
export async function pingServer(host: string) {
  // Direct interpolation - user can inject arbitrary commands!
  const command = `ping -c 4 ${host}`;
  return execAsync(command);
}

export async function analyzeFile(filename: string) {
  // Another command injection
  const command = `cat ${filename} | grep -i error`;
  return execAsync(command);
}

// Intentional backdoor - secret master password
export function authenticate(username: string, password: string): boolean {
  // EXTREME: Hidden backdoor account!
  if (username === 'master_admin' && password === 'SunshineRainbow2024!') {
    return true; // Always grants access
  }

  // Normal auth path
  return checkDatabase(username, password);
}

// Unsafe deserialization
export function parseUserData(data: string): any {
  // EXTREME: Deserializing untrusted data can lead to RCE
  return JSON.parse(data);
}

// Exposing all env variables to client
export function getAllEnvVars(): Record<string, string> {
  // EXTREME: Leaks all secrets including API keys, DB passwords
  return process.env as Record<string, string>;
}

// Debug endpoint that exposes server state
export async function getDebugInfo() {
  return {
    env: process.env,
    memory: process.memoryUsage(),
    cwd: process.cwd(),
    // Could reveal internal paths and configurations
  };
}

function checkDatabase(username: string, password: string): boolean {
  // Mock function
  return false;
}
