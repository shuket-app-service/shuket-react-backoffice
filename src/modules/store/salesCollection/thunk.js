import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const SALES_COLLECTION_LIST = "/sales_collection/moa_search_list";


export const getSalesCollectionList = createAsyncThunk(
    SALES_COLLECTION_LIST,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.post(SALES_COLLECTION_LIST, data);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

