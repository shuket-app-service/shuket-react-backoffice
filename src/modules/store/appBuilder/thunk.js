import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_SCREEN_BUILDER = "/appbuilder/get_screen_builder";
const UPDATE_APP_SCREEN_STATUS = "/appbuilder/upd_app_screen_status"
const SAVE_SORT_SCREEN = "/appbuilder/save_sort_screen"

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





