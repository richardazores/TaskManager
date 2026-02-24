// src/api/taskApi.js
import axios from "axios";

// Base URL from Vite env variable
const BASE_URL = import.meta.env.VITE_API_URL + "/tasks";

export const getTasks = () => axios.get(`${BASE_URL}/all`);
export const createTask = (task) => axios.post(`${BASE_URL}/create`, task);
export const updateTask = (_id, set) =>
  axios.post(`${BASE_URL}/update`, { _id, set });
export const deleteTask = (_id) => axios.post(`${BASE_URL}/delete`, { _id });
