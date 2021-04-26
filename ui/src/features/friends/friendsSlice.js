import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../configs/constants";
import avatarFetch from "../axiosActions/avatarAction";

const initialState = {
  friends: { data: [], fetched: false, fetchedFriendAvatar: false },
  suggests: { data: [], fetched: false },
  sentRequests: { data: [], fetched: false },
  requests: { data: [], fetched: false },
  search: [],
};

const name = "friends";

export const friendSearch = createAsyncThunk(
  `${name}/search`,
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/search`, {
        headers: { Authorization: thunkAPI.getState().user.token },
        params: { query },
      });
      console.log(res.data);
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
      const res = await axios.delete(
        `${domain}/api/friendship/delete/${profile.id}`,
        {
          headers: { Authorization: thunkAPI.getState().user.token },
        }
      );
      // thunkAPI.dispatch(getRequests());
      // thunkAPI.dispatch(getSentRequests());
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
        { headers: { Authorization: thunkAPI.getState().user.token } }
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
      const res = await axios.post(
        `${domain}/api/friendship/request/${profile.id}`,
        {},
        { headers: { Authorization: thunkAPI.getState().user.token } }
      );

      return profile;
    } catch (err) {
      console.log(err);
    }
  }
);

// fetchFriendAvatar
export const fetchFriendAvatar = createAsyncThunk(
  `${name}/getFriendAvatar`,
  async ({ friendId, avatarId, type }, thunkAPI) => {
    if (avatarId) {
      try {
        const avatarSrc = await avatarFetch(avatarId, thunkAPI);
        return { friendId, avatarSrc, type };
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return { friendId, avatarSrc: "", type };
  }
);

export const getFriendList = createAsyncThunk(
  `${name}/getFriendList`,
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship`, {
        headers: { Authorization: token },
      });

      return { data: res.data, fetched: true };
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const getSuggestedFriends = createAsyncThunk(
  `${name}/getSuggestedFriends`,
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/suggest`, {
        headers: { Authorization: token },
      });
      return { data: res.data, fetched: true };
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const getRequests = createAsyncThunk(
  `${name}/getRequests`,
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/request`, {
        headers: { Authorization: token },
      });
      return { data: res.data, fetched: true };
    } catch (err) {
      console.log(err);
      return { data: [], fetched: false };
    }
  }
);

export const getSentRequests = createAsyncThunk(
  `${name}/getSentRequests`,
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/sentRequest`, {
        headers: { Authorization: token },
      });
      return { data: res.data, fetched: true };
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
      state.friends.data = action.payload.data;
      state.friends.fetched = action.payload.fetched;
    },
    [getSuggestedFriends.fulfilled]: (state, action) => {
      state.suggests.data = action.payload.data;
      state.suggests.fetched = action.payload.fetched;
    },
    [getSentRequests.fulfilled]: (state, action) => {
      state.sentRequests.data = action.payload.data;
      state.sentRequests.fetched = action.payload.fetched;
    },
    [getRequests.fulfilled]: (state, action) => {
      state.requests.data = action.payload.data;
      state.requests.fetched = action.payload.fetched;
    },
    [acceptRequest.fulfilled]: (state, action) => {
      const profile = action.payload;
      const friendIndex = state.requests.data.findIndex(
        (friend) => friend.id === profile.id
      );
      if (friendIndex !== -1) {
        state.requests.data.splice(friendIndex, 1);
      }
      state.friends.data.push(action.payload);
    },
    [unfriend.fulfilled]: (state, action) => {
      const profile = action.payload;
      const friendIndex = state.friends.data.findIndex(
        (friend) => friend.id === profile.id
      );
      if (friendIndex !== -1) {
        state.friends.data.splice(friendIndex, 1);
        return;
      }
      const sentIndex = state.sentRequests.data.findIndex(
        (friend) => friend.id === profile.id
      );
      if (sentIndex !== -1) {
        state.sentRequests.data.splice(friendIndex, 1);
        return;
      }
    },
    [makeRequest.fulfilled]: (state, action) => {
      // thunkAPI.dispatch(getSentRequests());
      state.sentRequests.data.push(action.payload);
      const index = state.suggests.data.findIndex(
        (suggest) => suggest.id === action.payload.id
      );
      if (index !== -1) state.suggests.data.splice(index, 1);
    },
    [fetchFriendAvatar.fulfilled]: (state, action) => {
      if (action.payload) {
        const { friendId, avatarSrc, type } = action.payload;
        let arrFriends = [];

        switch (type) {
          case "friends":
            arrFriends = state.friends.data;
            break;
          case "suggests":
            arrFriends = state.suggests.data;
            break;
          case "requests":
            arrFriends = state.requests.data;
            break;
        }
        const friend = arrFriends.find((friend) => friend.id === friendId);
        if (friend) friend.avatarSrc = avatarSrc;
      }
    },
  },
});
export const { logout } = friendsSlice.actions;

export default friendsSlice.reducer;
