import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_MARTS_IMPORT = "/import/get_listmart";


export const getMartsImport = createAsyncThunk(
    GET_MARTS_IMPORT,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`${GET_MARTS_IMPORT}`);
      return response.data.data.listmart;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
