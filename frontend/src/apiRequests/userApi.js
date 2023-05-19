import axios from "axios";
import { BACKEND_URL } from "../config";
const API = axios.create({ baseURL: BACKEND_URL });

//get current user
export const getUser = (token) => {
  return API.get(`/user/currentUser`, {
    headers: { Authorization: `${token}` },
  });
};

//get user
export const getUserById = (id, token) => {
  return API.get(`/user/${id}`, { headers: { Authorization: `${token}` } });
};

//getAllUsers
export const getAllUsers = (token) => {
  return API.get(`/user`, { headers: { Authorization: `${token}` } });
};
