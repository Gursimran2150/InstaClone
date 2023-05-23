import axios from "axios";
import { BACKEND_URL } from "../config";

const API = axios.create({ baseURL: BACKEND_URL });

export const getPosts = () => {
  return API.get(`/posts`);
};

//upload image on firebase
export const createUrl = (file) => {
  return API.post(
    "/posts/image",
    { file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// upload file
export const uploadFile = (formData) => {
  return API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//update post
export const updatePost = (postId, content, token) => {
  console.log("PostId-:", postId);
  console.log("Content-:", content);
  console.log("Token-:", token);
  return axios.put(
    `${BACKEND_URL}/posts/${postId}`,
    { content: content },
    { headers: { Authorization: token } }
  );
};

//share post
export const sharePost = (data, token) => {
  return API.post("/posts", data, { headers: { Authorization: `${token}` } });
};
