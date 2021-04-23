import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../configs/constants";
import avatarFetch from "../axiosActions/avatarAction";

const initialState = { friends: [], suggests: [] };

const name = "friends";

// fetchFriendAvatar
export const fetchFriendAvatar = createAsyncThunk(
  `${name}/getFriendAvatar`,
  async ({ friendId, avatarId, type }, thunkAPI) => {
    return { friendId, avatarSrc: await avatarFetch(avatarId, thunkAPI), type };
  }
);

export const getFriendList = createAsyncThunk(
  `${name}/getFriendList`,
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship`, {
        headers: { Authorization: thunkAPI.getState().user.token },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const getSuggestedFriends = createAsyncThunk(
  `${name}/getSuggestedFriends`,
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/suggest`, {
        headers: { Authorization: thunkAPI.getState().user.token },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

const friendsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getFriendList.fulfilled]: (state, action) => {
      state.friends = action.payload;
    },
    [getSuggestedFriends.fulfilled]: (state, action) => {
      state.suggests = action.payload;
    },
    [fetchFriendAvatar.fulfilled]: (state, action) => {
      const { friendId, avatarSrc, type } = action.payload;
      let arrFriends = [];

      switch (type) {
        case "friends":
          arrFriends = state.friends;
          break;
        case "suggests":
          arrFriends = state.suggests;
          break;
      }
      const friend = arrFriends.find((friend) => friend.id === friendId);
      if (friend) friend.avatarSrc = avatarSrc;
    },
  },
});

export default friendsSlice.reducer;
