import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../../@crema/services/axios/ApiConfig";

const GET_PARTNER_OPTIONS = "/partner/get_partner_options";


export const getPartnerOption = createAsyncThunk(
    GET_PARTNER_OPTIONS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_PARTNER_OPTIONS);
      return response.data.data.list_partners;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

