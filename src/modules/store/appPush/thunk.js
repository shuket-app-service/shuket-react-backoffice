import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_PUSH_LIST = "/fcm/get_push_message_list";
const GET_PUSH_DETAIL = "/fcm/get_push_message_detail_viewcopy"


export const getPushList = createAsyncThunk(
    GET_PUSH_LIST,
  async ({page, per_page, s_type, search_keyword}, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_PUSH_LIST}?page=${page}&per_page=${per_page}&s_type=${s_type}&search_keyword=${search_keyword}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getPushDetail = createAsyncThunk(
  GET_PUSH_DETAIL,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_PUSH_DETAIL}?push_msg_code=${data}`);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);
