
import axios from "axios";


const API_BASE = "https://api.escuelajs.co/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);

export const getProductsByCategory = (categoryId) =>
  api.get(`/categories/${categoryId}/products`);


export const getCategories = () => api.get("/categories");
export const getCategoryById = (id) => api.get(`/categories/${id}`);


export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);


export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const getProfile = (token) =>
  api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

const ApiService = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  getCategoryById,
};

export default ApiService;
