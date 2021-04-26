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
  async ({ user, sendValues }, thunkAPI) => {
    try {
      const { ufile, content } = sendValues;
      let dto = {
        content,
        id: thunkAPI.getState().posts.posts[0]?.id + 1,
        likes: 0,
        userId: thunkAPI.getState().user.data.id,
        uploadTime: getISOStringNow(),
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
      let newUFile = "";
      if (ufile) newUFile = URL.createObjectURL(ufile);

      dto = {
        ...dto,
        liked: false,
        imageId: [],
        imgSrc: newUFile,
        userInfo: user,
      };

      return dto;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getPost = createAsyncThunk(
  `${name}/getPost`,
  async ({ ISOString, token }, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/post`, {
        headers: { Authorization: token },
        params: { time: ISOString },
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

export const getPostUserInfo = createAsyncThunk(
  `${name}/getPostUserInfo`,
  async (post, thunkAPI) => {
    const user = thunkAPI.getState().user;
    if (user.data.id === post.userId) {
      return { post, data: user.data };
    }
    const res = await axios.get(`${domain}/api/user/${post.userId}`, {
      headers: { Authorization: user.token },
    });
    return { post, data: res.data };
  }
);

export const getPostUserAvatar = createAsyncThunk(
  `${name}/getPostUserAvatar`,
  async ({ post }, thunkAPI) => {
    const { userInfo } = post;
    const res = await avatarFetch(userInfo.avatar, thunkAPI);
    return { post, avatarSrc: res };
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
    [addPost.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload);
    },
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
    [getPostUserInfo.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.post.id
      );
      const newPost = { ...state.posts[index], userInfo: action.payload.data };
      state.posts.splice(index, 1, newPost);
    },
    [getPostUserAvatar.fulfilled]: (state, action) => {
      const { avatarSrc, post } = action.payload;
      const newPost = { ...post, userInfo: { ...post.userInfo, avatarSrc } };
      const index = state.posts.findIndex((p) => p.id === post.id);
      state.posts.splice([index], 1, newPost);
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
