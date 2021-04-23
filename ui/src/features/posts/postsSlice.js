import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../configs/constants";

const name = "posts";
const initialState = { posts: [] };

export const addPost = createAsyncThunk(
  `${name}/addPost`,
  async ({ ufile, content }, thunkAPI) => {
    try {
      const dto = {
        content,
        id: 0,
        likes: 0,
        userId: thunkAPI.getState().user.data.id,
        uploadTime: "2021-04-18T03:50:32.729Z",
      };
      const formData = new FormData();
      formData.append(
        "postDto",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );
      if (!ufile) {
        const res = await axios.post(`${domain}/api/post/upload`, formData, {
          headers: {
            Authorization: thunkAPI.getState().user.token,
          },
        });
      } else {
        formData.append("file", ufile);
        const res = await axios.post(`${domain}/api/post/upload`, formData, {
          headers: {
            Authorization: thunkAPI.getState().user.token,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const getPost = createAsyncThunk(
  `${name}/getPost`,
  async (ISOString, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/post`, {
        headers: { Authorization: thunkAPI.getState().user.token },
        params: { time: ISOString },
      });
      const { friends } = thunkAPI.getState().friends;

      res.data.forEach((post) => {
        post.userInfo = friends.find((friend) => friend.id === post.userId);
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getProfilePost = createAsyncThunk(
  `${name}/getProfilePost`,
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/post/${id}`, {
        headers: { Authorization: thunkAPI.getState().user.token },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const postsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      if (action.payload) state.posts = action.payload;
    },
    [getProfilePost.fulfilled]: (state, action) => {
      if (action.payload) state.posts = action.payload;
    },
  },
});

export default postsSlice.reducer;
