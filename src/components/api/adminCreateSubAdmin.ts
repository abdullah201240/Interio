// src/api/adminApi.js
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const createAdmin = async (adminData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/createAdmin`, adminData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios error
      throw new Error(error.response?.data?.error || 'Failed to create admin');
    } else {
      // Other types of errors
      throw new Error('An unexpected error occurred');
    }
  }
};
