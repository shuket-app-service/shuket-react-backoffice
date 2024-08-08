import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_FCM_LIST = "/sales_collection/fcm_list";
 const GET_FCM_DETAIL = "/sales_collection/get_fcm";

export const getFcmList = createAsyncThunk(
    GET_FCM_LIST,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post(`${GET_FCM_LIST}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getFcmDetail = createAsyncThunk(
  GET_FCM_DETAIL,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_FCM_DETAIL}?fcm_code=${data}`);
    return response.data.data.fcm_info;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);