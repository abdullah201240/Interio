
import axios from 'axios';
import { API_BASE_URL } from '../../config';

// Define API endpoints
const endpoints = {
  
  sendResetCode: `${API_BASE_URL}/admin/forget-password`,
  verifyResetCode: `${API_BASE_URL}/admin/forget-password/verify`,
  resetPassword: `${API_BASE_URL}/admin/forget-password/reset`
};



// Send password reset code
export const sendResetCode = async (email: string) => {
  const response = await axios.post(endpoints.sendResetCode, { email });
  return response.data;
};

// Verify password reset code
export const verifyResetCode = async (email: string, code: string) => {
  const response = await axios.post(endpoints.verifyResetCode, { email, code });
  return response.data;
};

// Reset password
export const resetPassword = async (email: string, newPassword: string) => {
  const response = await axios.post(endpoints.resetPassword, { email, newPassword });
  return response.data;
};
