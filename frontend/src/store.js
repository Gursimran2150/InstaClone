import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postsSlice from "./slices/postsSlice";
import commentSlice from "./slices/commentSlice";
import searchSlice from "./slices/searchSlice";
import likeSlice from "./slices/likeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    allPosts: postsSlice,
    comments: commentSlice,
    searchUser: searchSlice,
    likes: likeSlice,
  },
  devTools: true,
});

export default store;
