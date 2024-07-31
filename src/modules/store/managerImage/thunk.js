import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_MANAGEMENT_IMAGE_LIST = "/admin/management_imges/list";


export const getManagementImageList = createAsyncThunk(
    GET_MANAGEMENT_IMAGE_LIST,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.get(`${GET_MANAGEMENT_IMAGE_LIST}?page=${data.page}&per_page=${data.per_page}&filter_status=${data.filter_status}&ln=${data.ln}`);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );


