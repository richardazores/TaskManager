import axios from "axios";

const BASE_URL = "http://localhost:5000/tasks";

export const getTasks = () => axios.get(`${BASE_URL}/all`);
export const createTask = (task) => axios.post(`${BASE_URL}/create`, task);
export const updateTask = (_id, set) =>
  axios.post(`${BASE_URL}/update`, { _id, set });
export const deleteTask = (_id) => axios.post(`${BASE_URL}/delete`, { _id });
