import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../configs/constants";

const initialState = {
  requests: [],
  suggestedFriends: [],
  friends: [],
  request: false,
  accept: 0,
};

export const getRequestList = createAsyncThunk(
  "friends/requests",
  async (token) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/request`, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getSuggestedFriends = createAsyncThunk(
  "friends/suggests",
  async (token) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/suggest`, {
        headers: { Authorization: token },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getFriends = createAsyncThunk(
  "friends/getFriends",
  async (token) => {
    try {
      const res = await axios.get(`${domain}/api/friendship`, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchFriendsAvatar = createAsyncThunk(
  "friends/avatar",
  async ({ friendId, friendType, avatarId }, thunkAPI) => {
    if (avatarId) {
      try {
        const res = await axios.get(`${domain}/api/image/${avatarId}`, {
          headers: { Authorization: thunkAPI.getState().user.token },
          responseType: "blob",
        });

        return { friendId, friendType, src: URL.createObjectURL(res.data) };
      } catch (err) {
        console.log(err);
      }
    }
  }
);
export const makeRequest = createAsyncThunk(
  "friends/request",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const { request } = thunkAPI.getState().friends;
      await axios.post(
        `${domain}/api/friendship/request/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      return !request;
    } catch (err) {
      console.log(err);
    }
  }
);
export const makeAccept = createAsyncThunk(
  "friends/accept",
  async (id, thunkAPI) => {
    try {
      await axios.put(
        `${domain}/api/friendship/accept/${id}`,
        {},
        { headers: { Authorization: thunkAPI.getState().user.token } }
      );
      return thunkAPI.getState().friends.accept + 1;
    } catch (err) {
      console.log(err);
    }
  }
);
export const makeChatRoom = () => console.log("chat room");

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    resetRequest(state, action) {
      state.request = "";
    },
  },
  extraReducers: {
    [getRequestList.fulfilled]: (state, action) => {
      state.requests = action.payload;
    },
    [getSuggestedFriends.fulfilled]: (state, action) => {
      state.suggestedFriends = action.payload;
    },
    [getFriends.fulfilled]: (state, action) => {
      state.friends = action.payload;
    },
    [fetchFriendsAvatar.fulfilled]: (state, action) => {
      if (action.payload) {
        const { friendId, friendType, src } = action.payload;
        switch (friendType) {
          case "requests": {
            const idx = state.requests.findIndex(
              (request) => request.id === friendId
            );

            // state.requests[idx].avatarSrc = src;
          }
          case "suggestedFriends": {
            const idx = state.suggestedFriends.findIndex(
              (request) => request.id === friendId
            );
            state.suggestedFriends[idx].avatarSrc = src;
          }
          case "friends": {
            const idx = state.friends.findIndex(
              (request) => request.id === friendId
            );
            // state.friends[idx].avatarSrc = src;
          }
        }
      }
    },
    [makeRequest.fulfilled]: (state, action) => {
      state.request = action.payload;
    },
    [makeAccept.fulfilled]: (state, action) => {
      state.accept = action.payload;
    }
  },
});

export default friendsSlice.reducer;
