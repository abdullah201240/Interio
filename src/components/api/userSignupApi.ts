import { API_BASE_URL } from '../../config';
import apiClient from './index';

interface SignupData {
    name: string;
    email: string;
    password: string;
    dob: string;
    gender: string;
}

export const initiateSignup = async (signupData: SignupData) => {
    try {
        const response = await apiClient.post('/user/signup', signupData);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const completeSignup = async (name:string,email: string, password: string,dob:string,gender:string, code: string) => {
    try {
        const response = await apiClient.post('/user/signup/verify', {name,email, password,  dob,gender, verificationCode:code});
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const signupWithGoogle = () => {
    window.open(`${API_BASE_URL}/user/auth/google/callback`, "_self");
};

const handleApiError = (error: any) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.error || 'Something went wrong!');
    } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please try again later.');
    } else {
        console.error('Error setting up the request:', error.message);
        throw new Error('Error setting up the request. Please try again.');
    }
};

