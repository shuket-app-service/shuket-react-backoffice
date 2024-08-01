import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_CATALOG_LIST = "/admin/management_catalogs/list";


export const getCatalogList = createAsyncThunk(
    GET_CATALOG_LIST,
  async ({page, per_page}, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_CATALOG_LIST}?page=${page}&per_page=${per_page}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
