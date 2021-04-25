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
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const unfriend = createAsyncThunk(
  `${name}/unfriend`,
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${domain}/api/friendship/delete/${id}`, {
        headers: { Authorization: thunkAPI.getState().user.token },
      });
      // thunkAPI.dispatch(getRequests());
      // thunkAPI.dispatch(getSentRequests());
      return id;
    } catch (err) {
      console.log(err);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  `${name}/acceptRequest`,
  async (id, thunkAPI) => {
    try {
      await axios.put(
        `${domain}/api/friendship/accept/${id}`,
        {},
        { headers: { Authorization: thunkAPI.getState().user.token } }
      );
      thunkAPI.dispatch(getRequests());
      thunkAPI.dispatch(getFriendList());
      return id;
    } catch (err) {
      console.log(err);
    }
  }
);

export const makeRequest = createAsyncThunk(
  `${name}/makeRequest`,
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(
        `${domain}/api/friendship/request/${id}`,
        {},
        { headers: { Authorization: thunkAPI.getState().user.token } }
      );
      thunkAPI.dispatch(getSentRequests());
      return id;
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
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship`, {
        headers: { Authorization: thunkAPI.getState().user.token },
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
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/suggest`, {
        headers: { Authorization: thunkAPI.getState().user.token },
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
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/request`, {
        headers: { Authorization: thunkAPI.getState().user.token },
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
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/friendship/sentRequest`, {
        headers: { Authorization: thunkAPI.getState().user.token },
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
    [unfriend.fulfilled]: (state, action) => {
      let [friendObj, type] = [
        state.friends.data.find((friend) => friend.id === action.payload),
        1,
      ];
      if (!friendObj)
        [friendObj, type] = [
          state.requests.data.find((friend) => friend.id === action.payload),
          2,
        ];

      if (type === 1)
        state.friends.data = state.friends.data.filter(
          (friend) => friend.id !== friendObj.id
        );

      if (type === 2)
        state.requests.data = state.requests.data.filter(
          (friend) => friend.id !== friendObj.id
        );

      state.suggests.data.push(friendObj);
    },
    [makeRequest.fulfilled]: (state, action) => {},
    [fetchFriendAvatar.fulfilled]: (state, action) => {
      if (action.payload) {
        const { friendId, avatarSrc, type } = action.payload;
        let arrFriends = [];

        switch (type) {
          case "friends":
            arrFriends = state.friends.data;
            state.friends.fetchedFriendAvatar = true;
            break;
          case "suggests":
            arrFriends = state.suggests.data;
            break;
        }
        const friend = arrFriends.find((friend) => friend.id === friendId);
        if (friend) friend.avatarSrc = avatarSrc;
      }
    },
  },
});
export const {logout} = friendsSlice.actions;

export default friendsSlice.reducer;
