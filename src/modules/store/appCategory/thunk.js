import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_APP_CATEGORY_LIST = "/appcategories/get_app_cate_list"
const GET_APP_SMALL_CATEGORY = "appcategories/get_small_cate_list"
const GET_APP_MID_CATEGORY = "appcategories/get_list_mid_cate"


export const getAppMidCategory = createAsyncThunk(
  GET_APP_MID_CATEGORY,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_APP_MID_CATEGORY}?cate_code=${data}`);
    //convert obj to array
    return Object.values(response.data.data.list_midcate_data);
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);
export const getAppSmallCategory = createAsyncThunk(
  GET_APP_SMALL_CATEGORY,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_APP_SMALL_CATEGORY}`);
    return response.data.data.list_data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const getAppCategoryList = createAsyncThunk(
    GET_APP_CATEGORY_LIST,
  async ({page, per_page, option_cate, search_method, search_key}, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_APP_CATEGORY_LIST}?page=${page}&per_page=${per_page}&option_cate=${option_cate}&search_method=${search_method}&search_key=${search_key}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
