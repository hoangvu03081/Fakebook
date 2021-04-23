import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "./friends/friendsSlice";
import postsSlice from "./posts/postsSlice";
import userSlice from "./user/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    friends: friendsSlice,
    posts: postsSlice,
  },
});
