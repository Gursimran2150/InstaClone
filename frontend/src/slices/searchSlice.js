import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../config";

const initialState = {
  users: [],
  loading: true,
  error: null,
};

//searching all the users
export const searchUsers = createAsyncThunk(
  "search/users",
  async ({ pattern, token }) => {
    console.log("pattern  " + pattern);
    console.log("token " + token);
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/user/search-by-name-pattern/${pattern}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return Object.values(data);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(searchUsers.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default searchSlice.reducer;
