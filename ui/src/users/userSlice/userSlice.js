import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";
import { MySwal } from "../../components/Swal/Swal";
import { domain } from "../../configs/constants";

const initialState = { token: "" };

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
