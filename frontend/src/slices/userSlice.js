import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../config";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

//fetching the user by id
export const fetchUserById = createAsyncThunk(
  "fetch/user/id",
  async ({ id, token }) => {
    const { data } = await axios.get(`${BACKEND_URL}/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  }
);

//handling the promise
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
