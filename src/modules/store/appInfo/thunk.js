import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_MART_INFO_APP = "/main/get_moa_mart_info_app";

export const getMartInfoApp = createAsyncThunk(GET_MART_INFO_APP, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_MART_INFO_APP}`);
      const customData = { ...response.data.data.mart_info, city: response.data.data.mart_info?.city?.code, district: response.data.data.mart_info?.district?.code };
      return customData;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});
