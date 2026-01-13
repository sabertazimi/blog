// Level 1: Mild - Console logs and missing error handling
export async function fetchUserData(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  console.log('Fetching user data for:', userId); // Left debug console.log

  const data = await response.json();
  return data;
  // Missing error handling - no try/catch
}

export function calculateDiscount(price: number, discount: number) {
  console.log('Calculating discount'); // Another console.log
  return price * discount;
  // No validation of input parameters
}
