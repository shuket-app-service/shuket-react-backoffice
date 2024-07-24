import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const SALES_COLLECTION_LIST = "/sales_collection/moa_search_list";
const SALES_COLLECTION_EXPORT_EXCEL = "/sales_collection/moa_export_excel";
const GET_FCM_OPTIONS = "/sales_collection/get_fcm_options"
const CHECK_USER_ADMIN_ID ="/sales_collection/check_users_admin_id"


export const checkUserAdminId = createAsyncThunk(
  CHECK_USER_ADMIN_ID,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post(CHECK_USER_ADMIN_ID, {u_id: data});
      return response.data.data.not_exists;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getFcmOptions = createAsyncThunk(
  GET_FCM_OPTIONS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_FCM_OPTIONS);
      return response.data.data.list_fcm;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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

  export const exportExcelSalesCollection = createAsyncThunk(
    SALES_COLLECTION_EXPORT_EXCEL,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.post(SALES_COLLECTION_EXPORT_EXCEL, data);
        const dataCustom = response.data.data.list_marts.map((mart)=>({
          number_order: mart.number_order,
          mart_type_name: mart.mart_type_name,
          mart_name_code: mart.mart_name +"/"+ mart.mart_code,
          pos: mart.pos_regcode  +"/"+ mart.tposcode,
          is_tdc: mart.is_tdc,
          is_order_sync: mart.is_order_sync,
          city_name: mart.city_name,
          district_name: mart.district_name,
          register_date: mart.register_date,
          status: mart.status == "A" ? "활성화" : ""
        }))
        return dataCustom
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

