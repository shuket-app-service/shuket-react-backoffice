import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuthNode from "../../../@crema/services/axios/ApiConfig_Node";

const IMPORT_PRODUCT = "/import/upload_file";
const CONFIRM_IMPORT = "/import/confirm_import";

export const importProduct = createAsyncThunk(IMPORT_PRODUCT, async (data, { rejectWithValue }) => {
   try {
      console.log("data", data);
      const formData = new FormData();
      formData.append("mart_code", "M000000221");
      formData.append("action", "import");
      formData.append("file", data);

      const response = await apiAuthNode.post(IMPORT_PRODUCT, formData, {
         headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const confirmImport = createAsyncThunk(
    CONFIRM_IMPORT,
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiAuthNode.post(CONFIRM_IMPORT, {action :"import", mart_code : "M000000221", data: data});
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
