
import {API_BASE_URL} from '../../config'

// authApi.ts
export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
      throw new Error('Failed to log in');
  }

  return response.json(); // Assuming the response returns a token and user data
};


