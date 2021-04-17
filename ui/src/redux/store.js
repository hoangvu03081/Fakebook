import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../users/userSlice/userSlice";

export default configureStore({
  reducer: {
    users: userSlice,
  },
});
