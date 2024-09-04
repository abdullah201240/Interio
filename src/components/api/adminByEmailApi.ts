import axios from 'axios';
import {API_BASE_URL} from '../../config'

// Function to get an admin by email
export const getAdminByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/email/${email}`);
    return response.data; // The admin data including role
  } catch (error) {
    console.error('Failed to fetch admin by email:', error);
    throw error;
  }
};
