import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";
import { MySwal } from "../../components/Swal/Swal";
import { apiDomain, token } from "../../configs/constants";

export let uToken = "";

const initialState = { isValidToken: false, data: {} };

export const isValidToken = createAsyncThunk("user/isValidToken", async () => {
  try {
    const uToken = localStorage.getItem(token);
    const res = await axios.get(`${apiDomain}/api/user`, {
      headers: { Authorization: uToken },
    });
    return res.data;
  } catch (err) {
    history.push("/login");
    console.log(err);
  }
});

export const login = createAsyncThunk("user/login", async (loginDto) => {
  try {
    const response = await axios.post(`${apiDomain}/api/auth/login`, loginDto);
    localStorage.setItem("token", response.data);
    history.push("/");
    return response.data;
  } catch (err) {
    localStorage.removeItem("token");

    MySwal.fire({
      icon: "error",
      title: "Wrong account",
      text: "Plese check your username and password again!",
    }).then((res) => history.go());
  }
});

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (formData) => {
    try {
      const file = formData;
      const res = await axios.post(
        `${apiDomain}/api/image/avatar/upload`,
        file,
        {
          headers: {
            Authorization: uToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchAvatar = createAsyncThunk("user/avatar",
  async (avatarId) => {
    if (avatarId) {
      try {
        const res = await axios.get(`${apiDomain}/api/image/${avatarId}`, {
          headers: { Authorization: uToken },
          responseType: "blob",
        });

        return URL.createObjectURL(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  })

export const register = async (userDto) => {
  try {
    await axios
      .post(`${apiDomain}/api/auth/register`, userDto)
      .then((result) => {
        MySwal.fire({
          title: "Register succeed!",
          text:
            "Welcome to Fakebook. The social is waiting for you, login now!!!",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "Go to Login",
        }).then((res) => {
          if (res.isConfirmed) history.push("/login");
        });
      });
  } catch (e) {
    MySwal.fire({
      title: "Register failed!",
      text: e.response.data?.reduce(
        (err, acc, ind) => (ind ? err + acc + ", " : err + acc + "."),
        ""
      ),
      confirmButtonColor: "#e7332d",
      icon: "error",
      confirmButtonText: "Register again",
    }).then((res) => {
      console.log(res);
      history.go();
    });
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      if (action.payload) {
        uToken = action.payload;
        state.isValidToken = true;
      }
    },
    [isValidToken.fulfilled]: (state, action) => {
      if (action.payload) {
        uToken = localStorage.getItem(token);
        state.data = action.payload;
        state.isValidToken = true;
      }
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.data.avatar = action.payload;
    },
    [fetchAvatar.fulfilled]: (state, action) => {
      if (action.payload) state.data.avatarSrc = action.payload;
    }
  },
});

export default userSlice.reducer;
