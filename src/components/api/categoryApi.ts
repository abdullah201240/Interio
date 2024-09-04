import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

type MutationCallbacks = {
  onSuccess?: () => void;
  onError?: () => void;
};

// Fetch all categories
export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/admin/categories`);
      return response.data;
    },
  });
};

// Fetch all subcategories
export const useGetSubCategories = () => {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/admin/subcategories`);
      return response.data;
    },
  });
};

// Create category
export const useCreateCategory = ({ onSuccess, onError }: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${API_BASE_URL}/admin/categories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
};

// Create subcategory
export const useCreateSubCategory = ({ onSuccess, onError }: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${API_BASE_URL}/admin/subcategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
};

// Update category
export const useUpdateCategory = ({ onSuccess, onError }: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const response = await axios.put(`${API_BASE_URL}/admin/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
};

// Update subcategory
export const useUpdateSubCategory = ({ onSuccess, onError }: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const response = await axios.put(`${API_BASE_URL}/admin/subcategories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
};

// Delete category
export const useDeleteCategory = ({ onSuccess, onError }: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_BASE_URL}/admin/categories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
};

// Delete subcategory
export const useDeleteSubCategory = ({ onSuccess, onError }: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_BASE_URL}/admin/subcategories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
};

// Function to fetch subcategories by category ID
const fetchSubCategoriesByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/subcategories/${categoryId}`);
    return response.data;
  } catch (error) {
    // Handle error here or rethrow it
    throw new Error('Failed to fetch subcategories');
  }
};

// Custom hook to use in your components
export const useGetSubCategoriesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['subCategories', categoryId], // Query key array
    queryFn: () => fetchSubCategoriesByCategory(categoryId), // Query function
    enabled: !!categoryId, // Only fetch if categoryId is available
    onError: (error: Error) => {
      // Handle error here
      console.error('Error fetching subcategories:', error.message);
      // Optionally, you can set state or call another function here
    },
  } as UseQueryOptions<any, Error, any, [string, string]>);
};