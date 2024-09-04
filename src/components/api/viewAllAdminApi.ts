// src/api/adminService.ts
import axios from 'axios';

import { API_BASE_URL } from '../../config';

// Function to get all admins
export const getAllAdmins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/getAllAdmins`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};
export const updateAdmin = async (id: number, adminData: any) => {
    const response = await axios.put(`${API_BASE_URL}/admin/updateAdmin/${id}`, adminData);
    return response.data;
  };
export const deleteAdmin = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/deleteAdmin/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete admin.');
    }
  };
