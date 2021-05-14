import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../configs/constants";
import { createHeaders } from "../../configs/createHeaders";

// class Post {
//   constructor(
//     id = 0,
//     content = "",
//     likes = 0,
//     userId = 0,
//     uploadTime = "",
//     liked = false,
//     imageId = []
//   ) {}
// }
const name = "posts";
const initialState = { posts: [] };

export const addPost = createAsyncThunk(
  `${name}/addPost`,
  async ({ user, sendValues }, thunkAPI) => {
    try {
      const { ufile, content } = sendValues;
      let dto = {
        content,
        id: thunkAPI.getState().posts.posts[0]?.id + 1,
        likes: 0,
        userId: user.id,
        uploadTime: new Date().toISOString(),
      };
      const formData = new FormData();
      formData.append(
        "postDto",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );
      if (!ufile) {
        await axios.post(
          `${domain}/api/post/upload`,
          formData,
          createHeaders()
        );
      } else {
        formData.append("files", ufile);
        await axios.post(
          `${domain}/api/post/upload`,
          formData,
          createHeaders()
        );
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

export const unlikePost = createAsyncThunk(
  `${name}/unlikePost`,
  async (id, thunkAPI) => {
    try {
      await axios.put(`${domain}/api/post/unlike/${id}`, {}, createHeaders());
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
      await axios.put(`${domain}/api/post/like/${id}`, {}, createHeaders());
      return id;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);

export const getPost = createAsyncThunk(
  `${name}/getPost`,
  async (ISOString, thunkAPI) => {
    try {
      const headers = createHeaders();

      let { data: posts } = await axios.get(`${domain}/api/post`, {
        ...headers,
        params: { time: ISOString },
      });

      // đã có tất cả các posts
      // lấy hình của từng post
      for (let post of posts) {
        if (post.imageId.length) {
          const res = await axios.get(
            `${domain}/api/image/${post.imageId[0]}`,
            {
              responseType: "blob",
              ...headers,
            }
          );
          const imgSrc = URL.createObjectURL(res.data);

          // gán image src vào post
          post.imgSrc = imgSrc;
        }
      }

      // tạo một array chứa tất cả các unique userId.
      const userIds = [];
      posts.forEach((post) => {
        if (userIds.indexOf(post.userId) === -1) {
          userIds.push(post.userId);
        }
      });

      // fetch userInfo từ tất cả uniqueId
      let userProfiles = await Promise.all(userIds.map(async (userId) => {
        return axios.get(`${domain}/api/user/${userId}`, headers);
      }));

      // fetch user avatar về
      userProfiles = await Promise.all(
        userProfiles.map(async ({ data: userProfile }) => {
          let avatarSrc = "";
          if (userProfile.avatar) {
            const res = await axios.get(
              `${domain}/api/image/${userProfile.avatar}`,
              {
                responseType: "blob",
                ...headers,
              }
            );
            avatarSrc = URL.createObjectURL(res.data);
          }
          return { ...userProfile, avatarSrc };
        })
      );
      // gán userInfo vào từng post
      posts.forEach(
        (post) =>
          (post.userInfo = userProfiles.find((user) => user.id === post.userId))
      );

      return posts;
    } catch (err) {
      console.log("getPost error:", err);

      return [];
    }
  }
);

export const getProfilePost = createAsyncThunk(
  `${name}/getPost`,
  async (profile, thunkAPI) => {
    try {
      const headers = createHeaders();

      let { data: posts } = await axios.get(
        `${domain}/api/post/${profile.id}`,
        {
          ...headers,
        }
      );

      // đã có tất cả các posts
      // lấy hình của từng post
      for (let post of posts) {
        if (post.imageId.length) {
          const res = await axios.get(
            `${domain}/api/image/${post.imageId[0]}`,
            {
              responseType: "blob",
              ...headers,
            }
          );
          const imgSrc = URL.createObjectURL(res.data);

          // gán image src vào post
          post.imgSrc = imgSrc;
        }
      }

      // gán userInfo vào từng post
      posts.forEach((post) => (post.userInfo = profile));

      return posts;
    } catch (err) {
      console.log("getPost error:", err);

      return [];
    }
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
  },
});

export const { logout } = postsSlice.actions;

export default postsSlice.reducer;
