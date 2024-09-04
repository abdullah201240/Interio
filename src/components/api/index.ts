import axios from 'axios';
import { API_BASE_URL } from '../../config';

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // This allows cookies to be sent across domains if necessary
});

// Response interceptor to handle global errors
apiClient.interceptors.response.use(
    response => response,
    error => {
        // You can log the error or display a toast message here
        return Promise.reject(error);
    }
);

export default apiClient;
