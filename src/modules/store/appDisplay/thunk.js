import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_SCREEN_BUILDER = "/appbuilder/get_screen_builder";
const UPDATE_APP_SCREEN_STATUS = "/appbuilder/upd_app_screen_status"
const SAVE_SORT_SCREEN = "/appbuilder/save_sort_screen"
const GET_APP_SCREEN_DETAIL = "/appbuilder/get_app_screen_detail?sc_code="
const GET_APP_TEMPLATE_LIST = "/appbuilder/get_app_tmpl_list"

const GET_APP_SCREEN_LIST = "/appbuilder/get_app_screen_list"
const GET_BANNER_LIST = "/banner/get_banner_list"
const GET_CATE_IMAGES = "/admin/management_imges/cate_images"



export const getAppScreenList = createAsyncThunk(
  GET_APP_SCREEN_LIST,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(GET_APP_SCREEN_LIST);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const getBannerList = createAsyncThunk(
  GET_BANNER_LIST,
async ({page, per_page}, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_BANNER_LIST}?page=${page}&per_page=${per_page}`);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);



export const getCateImages = createAsyncThunk(
  GET_CATE_IMAGES,
async ({ln}, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_CATE_IMAGES}?ln=${ln}`);
    return response.data.data.cate_images_list;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);


export const getAppTemplateList = createAsyncThunk(
  GET_APP_TEMPLATE_LIST,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(GET_APP_TEMPLATE_LIST);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);


export const getScreenBuilder = createAsyncThunk(
    GET_SCREEN_BUILDER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_SCREEN_BUILDER);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const getAppScreenDetail = createAsyncThunk(
  GET_APP_SCREEN_DETAIL,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(GET_APP_SCREEN_DETAIL+data);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);


export const updateAppScreenStatus = createAsyncThunk(
  UPDATE_APP_SCREEN_STATUS,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post(UPDATE_APP_SCREEN_STATUS, data);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const saveSortScreen = createAsyncThunk(
  SAVE_SORT_SCREEN,
async (data, { rejectWithValue }) => {
  try {
    const dataPost = data.map((ele) => {
      return {...ele, show_error:"input-okay" }
    })
    const response = await apiAuth.post(SAVE_SORT_SCREEN, dataPost);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);





