import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_PRODUCT_REGISTER = "/product/search_product_registered_list";
const GET_PRODUCT_UNREGISTER = "/product/search_product_unregistered_list";

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
