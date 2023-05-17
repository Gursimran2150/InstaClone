import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  error: false,
  loading: true,
};

export const likeDisLikePost = createAsyncThunk(
  "posts/like/dislike",
  async ({ id, token }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4500/likePost/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data.message;
    } catch (e) {
      return e.message;
    }
  }
);

const postLikeSlice = createSlice({
  name: "postLikeDisLike",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(likeDisLikePost.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(likeDisLikePost.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(likeDisLikePost.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default postLikeSlice.reducer;
