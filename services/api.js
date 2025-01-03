// Create a new file: services/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signUp = async (userData) => {
    try {
        const response = await api.post('/auth/signup/', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;