import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_APP_VERSION_LIST = "/appconfig/get_app_version_list";


export const getAppVersionList = createAsyncThunk(
    GET_APP_VERSION_LIST,
  async ({page, per_page, search_method, keyword_type, keyword_value}, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_APP_VERSION_LIST}?page=${page}&per_page=${per_page}&search_method=${search_method}&keyword_type=${keyword_type}&keyword_value=${keyword_value}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

