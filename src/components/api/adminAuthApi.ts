import {API_BASE_URL} from '../../config'

export const loginAdmin = async ({ email, password }: { email: string; password: string }) => {
    // Make your API call here, using `email` and `password`:
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json(); // Assuming the response is JSON with the token and email
  };
  