import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";
import { MySwal } from "../../components/Swal/Swal";
import { domain } from "../../configs/constants";

const initialState = { token: "", errors: {} };

export const login = createAsyncThunk("user/login", async (loginDto) => {
  try {
    const response = await axios.post(`${domain}/api/auth/login`, loginDto);
    localStorage.setItem("token", response.data);
    history.push("/");
    return response.data;
  } catch (err) {
    MySwal.fire({
      icon: "error",
      title: "Wrong account",
      text: "Plese check your username and password again!",
    });
  }
});

export const register = createAsyncThunk("user/register", async (values) => {
  console.log({ ...values, id: 0, avatar: "" });
  try {
    const userDto = { ...values, id: 0, avatar: "" };
    await axios.post(`${domain}/api/auth/register`, userDto).then((result) => {
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
    })
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
