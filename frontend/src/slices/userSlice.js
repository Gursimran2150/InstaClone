import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

export const fetchUserById = createAsyncThunk(
  "fetch/user/id",
  async ({ id, token }) => {
    console.log("id-: " + id);
    console.log("token-: " + token);
    console.log(`http://localhost:4500/user/${id}`);
    const { data } = await axios.get(`http://localhost:4500/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.loading = true;

        state.error = null;
      });
  },
});

export default userSlice.reducer;
