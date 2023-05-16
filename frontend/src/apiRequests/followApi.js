import axios from "axios";
import { BACKEND_URL } from "../config";

const API = axios.create({ baseURL: BACKEND_URL });

//follow user
export const follow = ({ id, token }) => {
  return API.post(`/follow/${id}`, " ", {
    headers: { Authorization: `${token}` },
  });
};
