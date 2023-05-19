import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../config";

const initialState = {
  data: {},
  loading: true,
  error: null,
};

//fetching all the comments on a particular post
export const fetchComments = createAsyncThunk("fetch/comments", async (id) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/comment/${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
});

//handling the promise
const commentSlice = createSlice({
  name: "comment",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
