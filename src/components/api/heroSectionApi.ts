import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

// Fetch all hero sections
export const useGetAllHeroSections = () => {
  return useQuery({
    queryKey: ['heroSections'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/admin/hero-sections`);
      return response.data;
    },
  });
};

// Create hero section
export const useCreateHeroSection = (p0: { onSuccess: () => void; onError: () => void; }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${API_BASE_URL}/admin/create/hero/section`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroSections'] }); // Updated line
    },
  });
};

// Update hero section
export const useUpdateHeroSection = (p0: { onSuccess: () => void; onError: () => void; }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const response = await axios.put(`${API_BASE_URL}/admin/hero-sections/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroSections'] }); // Updated line
    },
  });
};

// Delete hero section
export const useDeleteHeroSection = (p0: { onSuccess: () => void; onError: () => void; }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_BASE_URL}/admin/hero-sections/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroSections'] }); // Updated line
    },
  });
};
