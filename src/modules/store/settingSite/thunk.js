import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_SETTING_SITE = "/appconfig/get_site_setting_list";

export const getSettingSite = createAsyncThunk(
    GET_SETTING_SITE,
  async ({page, per_page}, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_SETTING_SITE}?page=${page}&per_page=${per_page}&search_method=ALL`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
