import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../config";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

//get all posts
export const fetchAllPosts = createAsyncThunk("posts/fetch/all", async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/posts`);
    return data;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});

//delete a Post
export const deletePostById = createAsyncThunk(
  "post/delete",
  async ({ id, userId }) => {
    try {
      const { data } = await axios.delete(`http://localhost:4500/posts/${id}`, {
        data: {
          userId,
        },
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  }
);

//handling the promise in extrareducers
const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default postsSlice.reducer;
