import axios from "axios";
import { BACKEND_URL } from "../config";

const API = axios.create({ baseURL: BACKEND_URL });

//delete comment from a post
export const deleteComment = (id, token) => {
  return API.delete(`/${id}`, { headers: { Authorization: `${token}` } });
};
