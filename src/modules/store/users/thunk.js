import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_GROUP_OPTION = "/users/group_options";
const GET_LEVEL_OPTION = "/users/level_options";


export const getGroupOption = createAsyncThunk(
    GET_GROUP_OPTION,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_GROUP_OPTION);
      return response.data.data.list_groups;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



export const getLevelOption = createAsyncThunk(
    GET_LEVEL_OPTION,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_LEVEL_OPTION);
      return response.data.data.list_levels;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
