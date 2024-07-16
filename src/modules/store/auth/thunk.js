import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialBackend } from "../../../@crema/constants/AppConst";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const LOGIN_API = "/auth/login";
const LIST_ACCOUNT_SWITCH = "/auth/get_list_account_switch";
const USER_SWITCH_ACCOUNT = "/auth/user_switch_account/";
const RESET_ACCOUNT = "/auth/reset_account/";

export const Login = createAsyncThunk(
  "auth/Login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(initialBackend + LOGIN_API, {
        id: data.email,
        pw: data.password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getListAccountSwitch = createAsyncThunk(
    LIST_ACCOUNT_SWITCH,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.get(LIST_ACCOUNT_SWITCH);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const switchAccount = createAsyncThunk(
    USER_SWITCH_ACCOUNT,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.get(USER_SWITCH_ACCOUNT + data);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );


  export const resetAccount = createAsyncThunk(
    RESET_ACCOUNT,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.get(RESET_ACCOUNT);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
