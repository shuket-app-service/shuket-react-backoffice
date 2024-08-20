import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_PRODUCT_REGISTER = "/product/search_product_registered_list";
const GET_PRODUCT_UNREGISTER = "/product/search_product_unregistered_list";
const SEARCH_PRODUCT_IMAGE = "/product/search_product_images"
const VIEW_DETAIL_REGISTER = "/product/view_detail"
const GET_PRODUCT_CATEGORY = "/product/get_product_categories"

const GET_PRODUCT_PRICE = "/product_price/search_product"



export const getProductPrice = createAsyncThunk(
  GET_PRODUCT_PRICE,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post(`${GET_PRODUCT_PRICE}`, data);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const getProductCategory = createAsyncThunk(
  GET_PRODUCT_CATEGORY,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_PRODUCT_CATEGORY}`);
    return response.data.data.list_category[0]?.group_items;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const getProductCategorySub = createAsyncThunk(
  GET_PRODUCT_CATEGORY,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.get(`${GET_PRODUCT_CATEGORY}?cate_parent=${data}`);
    return response.data.data.list_category[0]?.group_items;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const viewDetailRegister = createAsyncThunk(
  VIEW_DETAIL_REGISTER,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post(`${VIEW_DETAIL_REGISTER}?prd_seq=${data}`);
    return response.data.data.row_detail;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);

export const searchProductImage = createAsyncThunk(
  SEARCH_PRODUCT_IMAGE,
async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post(`${SEARCH_PRODUCT_IMAGE}`, data);
    return response.data.data.list_images;
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);



export const getProductRegister = createAsyncThunk(
    GET_PRODUCT_REGISTER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post(`${GET_PRODUCT_REGISTER}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const getProductUnregister = createAsyncThunk(
  GET_PRODUCT_UNREGISTER,
async (data, { rejectWithValue }) => {
  try {
    let response = await apiAuth.post(`${GET_PRODUCT_UNREGISTER}`, data);
    let listProduct = []

    //custom data
    for (let key in response.data.data.list_product) {
      listProduct.push(response.data.data.list_product[key])
    }

    return {...response.data.data, list_product : listProduct};
  } catch (err) {
    return rejectWithValue(err.message);
  }
}
);
