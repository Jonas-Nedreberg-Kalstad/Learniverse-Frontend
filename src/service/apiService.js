import axios from 'axios';
import { URL } from '../utils/url';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const token = cookies.get("JWT");

// Include the token in the headers if it exists
const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }) // only add if token exists
  };

// Create an axios instance with default config
const api = axios.create({
  baseURL: URL.BACKEND,
  timeout: 10000,
  headers: headers
});

// Response interceptor for handling common errors
api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle forbidden error (403)
      if (error.response && error.response.status === 403) {
        if(token) {
            window.location.href = '/unauthorized';
        } else {
            window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
);

// Generic function to handle requests
export const Fetch = async (method, endpoint, data = null, handleResponse) => {
    try {
      let response;
      switch (method) {
        case 'GET':
          response = await api.get(`/${endpoint}`);
          break;
        case 'POST':
          response = await api.post(`/${endpoint}`, data);
          break;
        case 'PUT':
          response = await api.put(`/${endpoint}`, data);
          break;
        case 'PATCH':
          response = await api.patch(`/${endpoint}`, data);
          break;
        case 'DELETE':
          response = await api.delete(`/${endpoint}`);
          break;
        default:
          throw new Error('Unsupported method');
      }
  
      // Call the response handler if provided
      if (typeof handleResponse === 'function') {
        handleResponse(response);
      }
  
      return response.data;
    } catch (error) {
      console.error(`${method} request error:`, error);
      throw error;
    }
};