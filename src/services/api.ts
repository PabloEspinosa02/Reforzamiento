import axios from 'axios';
import IProducts from '../interfaces/IProducts';

const API_URL = 'https://localhost:7105/api';

export const registerUser = (userData: { username: string, password: string, email: string }) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = (userData: { username: string, password: string }) => {
  const response = axios.post(`${API_URL}/Auth/login`, userData);
  return response;
};

export const getProducts = () => {
  const response = axios.get(`${API_URL}/products`);
  return response;
};

export const addProduct = (productData: Omit<IProducts, 'id'>) => {
  console.log(productData);
  
  return axios.post(`${API_URL}/products`, productData);
};

export const updateProduct = (productId: number, productData: { name: string, price: number, description: string, imageUrl: string }) => {  
  return axios.put(`${API_URL}/products/${productId}`, productData);
};

export const deleteProduct = (productId: number) => {
  return axios.delete(`${API_URL}/products/${productId}`);
};

export const addToCart = (cartItem: { productId: number, quantity: number, userId: number }) => {
  return axios.post(`${API_URL}/cart`, cartItem);
};

export const getCartItems = (userId: number) => {
  return axios.get(`${API_URL}/cart/${userId}`);
};

export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const addUser = (userData: { username: string, password: string, email: string }) => {
  return axios.post(`${API_URL}/users`, userData);
};

export const updateUser = (userId: number, userData: { username: string, password: string, email: string }) => {
  return axios.put(`${API_URL}/users/${userId}`, userData);
};

export const deleteUser = (userId: number) => {
  return axios.delete(`${API_URL}/users/${userId}`);
};
