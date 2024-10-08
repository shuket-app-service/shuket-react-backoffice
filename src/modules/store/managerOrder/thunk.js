import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

//MANAGER
const GET_ORDER_MART = "/adm_manage_order/get_list_mart_info";
const GET_LIST_MART_ORDER = "/adm_manage_order/get_list_mart";
const GET_LIST_PAYMENT_ORDER = "/adm_manage_order/getListPaymentCart";
const GET_LIST_STATUS_ORDER = "/adm_manage_order/get_list_ord_status";
const GET_ORDER_DETAIL = "/adm_manage_order/get_order_detail";
//MART
const GET_ORDER_PRINT = "/order/order_detail_print";
const GET_ORDER_OWN_MART = "/order/get_order_list";

export const getOrdersPrint = createAsyncThunk(GET_ORDER_PRINT, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.post(`${GET_ORDER_PRINT}`, {od_code_list: [data] });
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
 });


export const getOrderDetail = createAsyncThunk(GET_ORDER_DETAIL, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.post(`${GET_ORDER_DETAIL}`, data);
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
 });

export const getListStatusOrder = createAsyncThunk(GET_LIST_STATUS_ORDER, async (data, { rejectWithValue }) => {
  try {
     const response = await apiAuth.get(`${GET_LIST_STATUS_ORDER}`);
     return response.data.data.list_data;
  } catch (err) {
     return rejectWithValue(err.message);
  }
});

export const getListPaymentOrder = createAsyncThunk(GET_LIST_PAYMENT_ORDER, async (data, { rejectWithValue }) => {
  try {
     const response = await apiAuth.get(`${GET_LIST_PAYMENT_ORDER}`);
     return response.data.data.list_data;
  } catch (err) {
     return rejectWithValue(err.message);
  }
});

export const getListMartOrder = createAsyncThunk(GET_LIST_MART_ORDER, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(`${GET_LIST_MART_ORDER}`);
      return response.data.data.list_mart;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getOrderMart = createAsyncThunk(GET_ORDER_MART, async ({ page, per_page, search_mart, search_method, search_status, search_sdate, search_edate }, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(
         `${GET_ORDER_MART}?page=${page}&per_page=${per_page}&search_mart=${search_mart}&search_method=${search_method}&search_status=${search_status}&search_sdate=${search_sdate}&search_edate=${search_edate}`
      );
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});


export const getOrderOwnMart = createAsyncThunk(GET_ORDER_OWN_MART, async ({ sort_by_area, type_order, page, per_page, search_mart, search_method, search_status, search_sdate, search_edate }, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(
         `${GET_ORDER_OWN_MART}?sort_by_area=${sort_by_area}&type_order=${type_order}&page=${parseInt(page)}&per_page=${parseInt(per_page)}&search_mart=${search_mart}&search_method=${search_method}&search_status=${search_status}&search_sdate=${search_sdate}&search_edate=${search_edate}`
      );
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});
