import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../configs/constants";
import { createHeaders } from "../../configs/createHeaders";

const initialState = {
  friends: [],
  suggests: [],
  sentRequests: [],
  requests: [],
  search: [],
};

const name = "friends";

export const friendSearch = createAsyncThunk(
  `${name}/search`,
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/search`, {
        ...createHeaders(),
        params: { query },
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const unfriend = createAsyncThunk(
  `${name}/unfriend`,
  async (profile, thunkAPI) => {
    try {
      await axios.delete(
        `${domain}/api/friendship/delete/${profile.id}`,
        createHeaders()
      );
      return profile;
    } catch (err) {
      console.log(err);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  `${name}/acceptRequest`,
  async (profile, thunkAPI) => {
    try {
      await axios.put(
        `${domain}/api/friendship/accept/${profile.id}`,
        {},
        createHeaders()
      );
      return profile;
    } catch (err) {
      console.log(err);
    }
  }
);

export const makeRequest = createAsyncThunk(
  `${name}/makeRequest`,
  async (profile, thunkAPI) => {
    try {
      await axios.post(
        `${domain}/api/friendship/request/${profile.id}`,
        {},
        createHeaders()
      );

      return profile;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getFriendList = createAsyncThunk(
  `${name}/getFriendList`,
  async (_, thunkAPI) => {
    try {
      const headers = createHeaders();
      // getFriendList
      let { data: friendList } = await axios.get(
        `${domain}/api/friendship`,
        headers
      );

      friendList = await Promise.all(
        friendList.map(async (friend) => {
          let avatarSrc = "";
          if (friend.avatar) {
            const res = await axios.get(
              `${domain}/api/image/${friend.avatar}`,
              {
                responseType: "blob",
                ...headers,
              }
            );
            avatarSrc = URL.createObjectURL(res.data);
          }
          return { ...friend, avatarSrc };
        })
      );

      return friendList;
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const getSuggestedFriends = createAsyncThunk(
  `${name}/getSuggestedFriends`,
  async (_, thunkAPI) => {
    try {
      const headers = createHeaders();
      // getFriendList
      let { data: friendList } = await axios.get(
        `${domain}/api/friendship/suggest`,
        headers
      );

      friendList = await Promise.all(
        friendList.map(async (friend) => {
          let avatarSrc = "";
          if (friend.avatar) {
            const res = await axios.get(
              `${domain}/api/image/${friend.avatar}`,
              {
                responseType: "blob",
                ...headers,
              }
            );
            avatarSrc = URL.createObjectURL(res.data);
          }
          return { ...friend, avatarSrc };
        })
      );

      return friendList;
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const getRequests = createAsyncThunk(
  `${name}/getRequests`,
  async (_, thunkAPI) => {
    try {
      const headers = createHeaders();
      // getFriendList
      let { data: friendList } = await axios.get(
        `${domain}/api/friendship/request`,
        headers
      );

      friendList = await Promise.all(
        friendList.map(async (friend) => {
          let avatarSrc = "";
          if (friend.avatar) {
            const res = await axios.get(
              `${domain}/api/image/${friend.avatar}`,
              {
                responseType: "blob",
                ...headers,
              }
            );
            avatarSrc = URL.createObjectURL(res.data);
          }
          return { ...friend, avatarSrc };
        })
      );

      return friendList;
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const getSentRequests = createAsyncThunk(
  `${name}/getSentRequests`,
  async (_, thunkAPI) => {
    try {
      const headers = createHeaders();
      // getFriendList
      let { data: friendList } = await axios.get(
        `${domain}/api/friendship/sentRequest`,
        headers
      );

      friendList = await Promise.all(
        friendList.map(async (friend) => {
          let avatarSrc = "";
          if (friend.avatar) {
            const res = await axios.get(
              `${domain}/api/image/${friend.avatar}`,
              {
                responseType: "blob",
                ...headers,
              }
            );
            avatarSrc = URL.createObjectURL(res.data);
          }
          return { ...friend, avatarSrc };
        })
      );

      return friendList;
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const friendsSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout(state, action) {
      return initialState;
    },
  },
  extraReducers: {
    [friendSearch.fulfilled]: (state, action) => {
      state.search = action.payload;
    },
    [getFriendList.fulfilled]: (state, action) => {
      state.friends = action.payload;
    },
    [getSuggestedFriends.fulfilled]: (state, action) => {
      state.suggests = action.payload;
    },
    [getSentRequests.fulfilled]: (state, action) => {
      state.sentRequests = action.payload;
    },
    [getRequests.fulfilled]: (state, action) => {
      state.requests = action.payload;
    },
    [acceptRequest.fulfilled]: (state, action) => {
      const profile = action.payload;
      const friendIndex = state.requests.findIndex(
        (friend) => friend.id === profile.id
      );
      state.requests.splice(friendIndex, 1);
      state.friends.push(action.payload);
    },
    [unfriend.fulfilled]: (state, action) => {
      const profile = action.payload;
      const friendIndex = state.friends.findIndex(
        (friend) => friend.id === profile.id
      );
      if (friendIndex !== -1) {
        state.friends.splice(friendIndex, 1);
        return;
      }
      const sentIndex = state.sentRequests.findIndex(
        (friend) => friend.id === profile.id
      );
      if (sentIndex !== -1) {
        state.sentRequests.splice(friendIndex, 1);
        return;
      }
    },
    [makeRequest.fulfilled]: (state, action) => {
      state.sentRequests.push(action.payload);
      state.suggests = state.suggests.filter(
        (suggest) => suggest.id !== action.payload.id
      );
    },
  },
});
export const { logout } = friendsSlice.actions;

export default friendsSlice.reducer;
