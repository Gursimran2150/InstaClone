import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postsSlice from "./slices/postsSlice";
import commentSlice from "./slices/commentSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    allPosts: postsSlice,
    comments: commentSlice,
    searchUser: searchSlice,
  },
  devTools: true,
});

export default store;
