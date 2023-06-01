import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeCount: 0,
  likeBtn: "",
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    initState: (state, action) => {
      state.likeCount = action.payload.likeCount;
      state.likeBtn = action.payload.likeBtn;
    },
    incrementLike: (state, action) => {
      state.likeCount = state.likeCount + 1;
      state.likeBtn = "../images/inputIcons/redHeart.png";
    },
    decrementLike: (state, action) => {
      if (state.likeCount !== 0) {
        state.likeCount = state.likeCount - 1;
        state.likeBtn = "../images/inputIcons/blackHeart3.png";
      }
    },
  },
});

export const { initState, incrementLike, decrementLike } = likeSlice.actions;

export default likeSlice.reducer;
