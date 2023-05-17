import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { async } from "react-input-emoji";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

//get all posts
export const fetchAllPosts = createAsyncThunk("posts/fetch/all", async () => {
  try {
    const { data } = await axios.get("http://localhost:4500/posts");
    return data;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});

//delete a Post
export const deletePost = createAsyncThunk("post/delete", async () => {});

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
