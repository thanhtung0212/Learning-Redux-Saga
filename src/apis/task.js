import axiosService from "../commons/axiosService";
import { API_ENDPOINT } from "../contants";
import qs from "query-string";

//http://localhost:3000/task
const url = "task";

export const getList = (params = {}) => {
  let queryParams = "";
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
};
// http://localhost:3000/task METHOD: POST
export const addTask = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, data);
};
//http://localhost:3000/task/:id METHOD: PUT
export const updateTask = (data, id) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${id}`, data);
};
//http://localhost:3000/task/:id METHOD: DELETE
export const deleteTask = (taskId) => {
  return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};
