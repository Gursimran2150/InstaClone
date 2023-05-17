import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  loading: true,
  error: null,
};

export const fetchComments = createAsyncThunk("fetch/comments", async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:4500/comment/${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
});

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
