import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "./friends/friendsSlice";
import userSlice from "./user/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    friends: friendsSlice,
  },
});
