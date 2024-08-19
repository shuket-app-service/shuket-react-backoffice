import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_APP_CATEGORY_LIST = "/appcategories/get_app_cate_list"

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
