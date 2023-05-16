import axios from "axios";
import { BACKEND_URL } from "../../config";

const API = axios.create({baseURL:BACKEND_URL })

// like on post 
export const postLike=({postId,token} )=>{
  return API.put(`/likePost/${postId}`," ",{headers:{"Authorization":`${token}`}})
}