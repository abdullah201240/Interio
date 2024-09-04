import axios from 'axios';
import {API_BASE_URL} from '../../config'
// Set the base URL for your API

export const addProduct = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/addProduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const deleteProduct = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
};

export const updateProduct = async (product: { id: number; [key: string]: any }) => {
    const formData = new FormData();
    
    // Append each field to the FormData object
    Object.keys(product).forEach(key => {
        const value = product[key];
        if (value !== undefined && value !== null) {
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value as string);
            }
        }
    });

    // Debugging: log FormData entries
    console.log('FormData Entries:');
    Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(`${key}:`, value);
    });

    try {
        const response = await fetch(`${API_BASE_URL}/admin/products/${product.id}`, {
            method: 'PUT',
            body: formData, // Browser sets 'Content-Type' automatically
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update product: ${errorData.message || 'Unknown error'}`);
        }

        // Optional: return response data if needed
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error; // Re-throw the error after logging it
    }
};



