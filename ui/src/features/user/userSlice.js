import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";
import { MySwal } from "../../components/Swal/Swal";
import { domain } from "../../configs/constants";
import { createHeaders } from "../../configs/createHeaders";
import { friendsSlice } from "../friends/friendsSlice";
import { postsSlice } from "../posts/postsSlice";

// class UserData {
//   constructor(id = 0, username = "", name = "", avatar = "", avatarSrc = "") {
//     this.id = id;
//     this.username = username;
//     this.name = name;
//     this.avatar = avatar;
//     this.avatarSrc = avatarSrc;
//   }
// }
// {
//   id: 0,
//   username: "",
//   name: "",
//   avatar: "",
//   avatarSrc: "",
// }
const initialState = {
  data: {},
  profile: {},
};

// 403 là lỗi Forbidden

export const isValidToken = createAsyncThunk(
  "user/isValidToken",
  async (_, thunkAPI) => {
    try {
      const headers = createHeaders();
      // check if token is valid

      const { data } = await axios.get(`${domain}/api/user`, headers);

      // fetch user avatar
      let avatarSrc = "";
      if (data.avatar) {
        const res = await axios.get(`${domain}/api/image/${data.avatar}`, {
          responseType: "blob",
          ...headers,
        });
        avatarSrc = URL.createObjectURL(res.data);
      }
      // if valid return data to state
      return { ...data, avatarSrc };
    } catch (err) {
      // else redirect user to login page
      history.push("/login");
      // and send invalid signal to state
      console.log(err);
      return {
        data: {},
      };
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (id, thunkAPI) => {
    try {
      const user = thunkAPI.getState().user;
      if (id === user.data.id) return user.data;

      const headers = createHeaders();
      const { data } = await axios.get(`${domain}/api/user/${id}`, headers);

      let avatarSrc = "";
      if (data.avatar) {
        const res = await axios.get(`${domain}/api/image/${data.avatar}`, {
          responseType: "blob",
          ...headers,
        });
        avatarSrc = URL.createObjectURL(res.data);
      }
      return { ...data, avatarSrc };
    } catch (err) {
      return {};
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
  async (formData, thunkAPI) => {
    try {
      const file = formData;
      const res = await axios.post(
        `${domain}/api/image/avatar/upload`,
        file,
        createHeaders()
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      return res.data;
    } catch (err) {
      return "";
    }
  }
);

export const register = async (values) => {
  try {
    // constructing dob
    const y = values.dob.getFullYear();
    let m = values.dob.getMonth() + 1;
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

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  thunkAPI.dispatch(userSlice.actions.logout());
  thunkAPI.dispatch(postsSlice.actions.logout());
  thunkAPI.dispatch(friendsSlice.actions.logout());
  history.push("/login");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      return initialState;
    },
    clearProfile(state, action) {
      state.profile = {};
    },
  },
  extraReducers: {
    [isValidToken.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.data.avatar = action.payload;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { clearProfile } = userSlice.actions;

export default userSlice.reducer;
