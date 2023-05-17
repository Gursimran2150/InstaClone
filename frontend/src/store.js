import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postsSlice from "./slices/postsSlice";
import postLikeSlice from "./slices/postLikeSlice";
import commentSlice from "./slices/commentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    allPosts: postsSlice,
    likeDislikePost: postLikeSlice,
    comments: commentSlice,
  },
  devTools: true,
});

export default store;
