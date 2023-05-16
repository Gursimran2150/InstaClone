import axios from "axios";
import { BACKEND_URL } from "../config";

const API = axios.create({ baseURL:BACKEND_URL });


//add comment on post 
export const commentOnPost = (data, token) => {
  return API.post(`/comment/${data.postId}`, { text: data.text }, { headers: { "Authorization": `${token}` } })
}
