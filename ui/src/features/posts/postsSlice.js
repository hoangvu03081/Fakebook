import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { domain } from "../../configs/constants";

const name = "posts";
const initialState = {};

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
      const postDto = new FormData();
      postDto.append("postDto", dto);
      if (!ufile) {
        axios.post(
          `${domain}/api/post/upload`,
          { postDto },
          {
            headers: {
              Authorization: thunkAPI.getState().user.token,
            },
          }
        );
      } else {
        const file = new FormData();
        file.append("file", ufile);
        axios.post(
          `${domain}/api/post/upload`,
          { postDto, file },
          {
            headers: {
              Authorization: thunkAPI.getState().user.token,
            },
          }
        );
      }
      // const postDto = {
      //   content: "Number1",
      //   id: 0,
      //   likes: 0,
      //   uploadTime: "2021-04-18T03:50:32.729Z",
      //   userId: 1,
      // };
      // formData.append("postDto", postDto);

      // axios.post(`${domain}/api/post/upload`, formData, {
      //   headers: {
      //     Authorization: thunkAPI.getState().user.token,
      //   },
      // });
    } catch (err) {
      console.log(err);
    }
  }
);

const postsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postsSlice.reducer;
