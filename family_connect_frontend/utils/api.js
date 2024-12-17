// utils/api.js

import axios from 'axios';

// Set base URL for API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register Function
export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;  // Return response data, e.g., access_token
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
    throw error;
  }
};

// Login Function
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;  
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};
