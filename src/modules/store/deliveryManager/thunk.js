import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_DELIVERY_ADDRESS = "/delivery/get_mart_delivery_address_list";
const CHECK_ADDRESS = "/delivery/check_address";


export const searchAddress = createAsyncThunk(CHECK_ADDRESS, async (data, { rejectWithValue }) => {
   try {

      const response = await apiAuth.post(CHECK_ADDRESS, data);
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});


export const getDeliveryAddress = createAsyncThunk(GET_DELIVERY_ADDRESS, async ({ page, per_page, keyword_value, keyword_type }, { rejectWithValue }) => {
   try {
      const params = keyword_value
         ? `${GET_DELIVERY_ADDRESS}?keyword_value=${keyword_value}&keyword_type=${keyword_type}&page=${page}&per_page=${per_page}`
         : `${GET_DELIVERY_ADDRESS}?page=${page}&per_page=${per_page}`;
      const response = await apiAuth.get(params);
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});
