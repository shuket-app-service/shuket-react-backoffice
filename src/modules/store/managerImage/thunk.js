import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_MANAGEMENT_IMAGE_LIST = "/admin/management_imges/list";
const GET_IMAGE_WITH_BARCODE = "/product_images/get_list_images_with_barcode";
const GET_IMAGE_WITHOUT_BARCODE = "/product_images/get_list_images_without_barcode";


export const getManagementImageList = createAsyncThunk(
  GET_MANAGEMENT_IMAGE_LIST,
    async ({key_type, keyword_value, page, per_page, image_type, image_cate, filter_order, filter_status, ln}, { rejectWithValue }) => {
      try {
        const response = await apiAuth.get(`${GET_MANAGEMENT_IMAGE_LIST}?key_type=${key_type}&key_value=${keyword_value}&page=${page}&per_page=${per_page}&image_type=${image_type}&image_cate=${image_cate}&filter_order=${filter_order}&filter_status=${filter_status}&ln=${ln}`);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );


  export const getImageWithBarcode = createAsyncThunk(
    GET_IMAGE_WITH_BARCODE,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.post(GET_IMAGE_WITH_BARCODE, data);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  
  export const getImageWithoutBarcode = createAsyncThunk(
    GET_IMAGE_WITHOUT_BARCODE,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuth.post(GET_IMAGE_WITHOUT_BARCODE, data);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
