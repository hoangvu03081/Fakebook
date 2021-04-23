import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";
import { MySwal } from "../../components/Swal/Swal";
import { domain, token } from "../../configs/constants";
import avatarFetch from "../axiosActions/avatarAction";

const initialState = { token: "", isValidToken: false, data: {} };

export const isValidToken = createAsyncThunk(
  "user/isValidToken",
  async (_, thunkAPI) => {
    try {
      // get token from previos login
      const uToken = localStorage.getItem(token);

      // check if token is valid
      const res = await axios.get(`${domain}/api/user`, {
        headers: { Authorization: uToken },
      });

      // if valid return data to state
      return { data: res.data, token: uToken, isValidToken: true };
    } catch (err) {
      // else redirect user to login page
      history.push("/login");
      // and send invalid signal to state
      return {
        data: {},
        token: "Invalid Token",
        isValidToken: false,
        load: false,
      };
    }
  }
);

export const login = createAsyncThunk("user/login", async (loginDto) => {
  try {
    // login with loginDto
    const response = await axios.post(`${domain}/api/auth/login`, loginDto);

    // if not error then set token to localStorage
    localStorage.setItem("token", response.data);

    // push to homepage
    history.push("/");

    // and save the token to redux store
    return response.data;
  } catch (err) {
    localStorage.removeItem("token");

    MySwal.fire({
      icon: "error",
      title: "Wrong account",
      text: "Plese check your username and password again!",
    }).then((res) => history.go());

    return "";
  }
});

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (formData, thunkAPI) => {
    try {
      const file = formData;
      const res = await axios.post(`${domain}/api/image/avatar/upload`, file, {
        headers: {
          Authorization: thunkAPI.getState().user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return "";
    }
  }
);

export const fetchAvatar = createAsyncThunk(
  "user/avatar",
  async (avatarId, thunkAPI) => {
    return await avatarFetch(avatarId, thunkAPI);
  }
);

export const register = async (values) => {
  try {
    // constructing dob
    const y = values.dob.getFullYear();
    let m = values.dob.getMonth();
    m = m < 10 ? "0" + m : m;
    let d = values.dob.getDate();
    d = d < 10 ? "0" + d : d;
    const dob = `${y}-${m}-${d}`;

    // userDto which send to the backend has this form
    const userDto = {
      ...values,
      dob,
      id: 0,
      avatar: "",
    };

    // try to register
    await axios.post(`${domain}/api/auth/register`, userDto);

    // if success alert
    const res = await MySwal.fire({
      title: "Register succeed!",
      text: "Welcome to Fakebook. The social is waiting for you, login now!!!",
      confirmButtonColor: "#3085d6",
      icon: "success",
      confirmButtonText: "Go to Login",
    });

    // redirect to login page
    if (res.isConfirmed) history.push("/login");
  } catch (e) {
    // if has error => inform the users
    MySwal.fire({
      title: "Register failed!",
      text: e.response.data?.reduce(
        (err, acc, ind) => (ind ? err + acc + ", " : err + acc + "."),
        ""
      ),
      confirmButtonColor: "#e7332d",
      icon: "error",
      confirmButtonText: "Register again",
    });
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state.isValidToken = false;
      state.data = {};
      localStorage.removeItem(token);
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [isValidToken.fulfilled]: (state, action) => {
      const { data, token, isValidToken } = action.payload;
      state.data = data;
      state.token = token;
      state.isValidToken = isValidToken;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.data.avatar = action.payload;
    },
    [fetchAvatar.fulfilled]: (state, action) => {
      state.data.avatarSrc = action.payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
