import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_NOTICE_LIST = "/appconfig/get_notice_list";
const GET_APP_NOTICE_LIST = "/App_noti_msg/get_list_noti_msg";
const GET_INFO_MART_OF_NOTICE = "app_noti_msg/edit_notice_message_no_image";

const GET_LIST_MART_GSK = "/app_noti_msg/get_list_mart_type_gsk";
const GET_LIST_MART_YSK = "/app_noti_msg/get_list_mart_type_ysk";
const GET_LIST_MART_SK = "/app_noti_msg/get_list_mart_type_sk";
const GET_LIST_MART_SG = "/app_noti_msg/get_list_mart_type_sg";


export const getInfoMartOfNotice = createAsyncThunk(GET_INFO_MART_OF_NOTICE, async (data, { rejectWithValue }) => {
  try {
     const response = await apiAuth.get(`${GET_INFO_MART_OF_NOTICE}?notice_code=${data}`);
     return response.data.data;
  } catch (err) {
     return rejectWithValue(err.message);
  }
});

export const getListMartGsk = createAsyncThunk(GET_LIST_MART_GSK, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_LIST_MART_GSK}`);
      return response.data.data.data_gsk;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getListMartYsk = createAsyncThunk(GET_LIST_MART_YSK, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_LIST_MART_YSK}`);
      return response.data.data.data_ysk;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getListMartSk = createAsyncThunk(GET_LIST_MART_SK, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_LIST_MART_SK}`);
      return response.data.data.data_sk;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getListMartSg = createAsyncThunk(GET_LIST_MART_SG, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_LIST_MART_SG}`);
      return response.data.data.data_sg;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getNoticeList = createAsyncThunk(GET_NOTICE_LIST, async ({ page, per_page }, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_NOTICE_LIST}?page=${page}&per_page=${per_page}&search_method=ALL`);
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getAppNoticeList = createAsyncThunk(GET_APP_NOTICE_LIST, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.post(`${GET_APP_NOTICE_LIST}`, data);
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});
