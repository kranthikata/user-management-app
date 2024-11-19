import axios from "axios";

// Create an Axios instance with a base URL to make API requests
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Base URL for the mock API
});

// Fetch all users from the API
export const fetchUsers = () => api.get("/users");

// Add a new user to the API
export const addUser = (user) => api.post("/users", user);

// Update an existing user by ID
export const updateUser = (id, user) => api.put(`/users/${id}`, user);

// Delete a user by ID
export const deleteUser = (id) => api.delete(`/users/${id}`);
