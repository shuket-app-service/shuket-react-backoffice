import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_NOTICE_LIST = "/appconfig/get_notice_list";
const GET_APP_NOTICE_LIST = "/App_noti_msg/get_list_noti_msg";


export const getNoticeList = createAsyncThunk(
    GET_NOTICE_LIST,
  async ({page, per_page}, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_NOTICE_LIST}?page=${page}&per_page=${per_page}&search_method=ALL`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAppNoticeList = createAsyncThunk(
    GET_APP_NOTICE_LIST,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post(`${GET_APP_NOTICE_LIST}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);