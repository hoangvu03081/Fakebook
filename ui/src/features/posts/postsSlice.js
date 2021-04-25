import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { post } from "jquery";
import { domain } from "../../configs/constants";
import { getISOStringNow } from "../../configs/normalizeFunc";
import avatarFetch from "../axiosActions/avatarAction";

const name = "posts";
const initialState = { posts: [] };

export const unlikePost = createAsyncThunk(
  `${name}/unlikePost`,
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(
        `${domain}/api/post/unlike/${id}`,
        {},
        { headers: { Authorization: thunkAPI.getState().user.token } }
      );
      console.log(res.data);
      return id;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);

export const likePost = createAsyncThunk(
  `${name}/likePost`,
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(
        `${domain}/api/post/like/${id}`,
        {},
        { headers: { Authorization: thunkAPI.getState().user.token } }
      );
      return id;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);

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
        formData.append("files", ufile);
        const res = await axios.post(`${domain}/api/post/upload`, formData, {
          headers: {
            Authorization: thunkAPI.getState().user.token,
          },
        });
      }
      thunkAPI.dispatch(getPost(getISOStringNow()));
    } catch (err) {
      console.log(err);
    }
  }
);

export const getPost = createAsyncThunk(
  `${name}/getPost`,
  async (ISOString, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await axios.get(`${domain}/api/post`, {
        headers: { Authorization: state.user.token },
        params: { time: ISOString },
      });

      const friends = state.friends.friends;

      res.data = res.data.map((post) => {
        if (post.userId === state.user.data.id)
          return { ...post, userInfo: state.user.data };
        else
          return {
            ...post,
            userInfo: friends.data.find((friend) => friend.id === post.userId),
          };
      });

      return res.data;
    } catch (err) {
      console.log("getPost error:", err);

      return [];
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

      //userInfo
      res.data = res.data.map((post) => ({
        ...post,
        userInfo: thunkAPI.getState().user.profile,
      }));
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const fetchPostImage = createAsyncThunk(
  `${name}/fetchPostImage`,
  async ({ postId, avatarId }, thunkAPI) => {
    if (avatarId) {
      const imgSrc = await avatarFetch(avatarId, thunkAPI);
      return { postId, imgSrc };
    }
    return "";
  }
);

export const postsSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout(state, action) {
      return initialState;
    },
  },
  extraReducers: {
    [likePost.fulfilled]: (state, action) => {
      if (action.payload) {
        const post = state.posts.find((post) => post.id === action.payload);
        if (post) {
          ++post.likes;
          post.liked = true;
        }
      }
    },
    [unlikePost.fulfilled]: (state, action) => {
      if (action.payload) {
        const post = state.posts.find((post) => post.id === action.payload);
        if (post) {
          --post.likes;
          post.liked = false;
        }
      }
    },
    [getPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getProfilePost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [fetchPostImage.fulfilled]: (state, action) => {
      const { postId, imgSrc } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) post.imgSrc = imgSrc;
    },
  },
});

export default postsSlice.reducer;
