import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";

const GET_LEVEL_LIST = "/users/search_level_list";
const GET_GROUP_OPTION = "/users/group_options";
const GET_LEVEL_OPTION = "/users/level_options";
const GET_USER_LIST = "/users/search_list";

export const getGroupOption = createAsyncThunk(GET_GROUP_OPTION, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(GET_GROUP_OPTION);
      return response.data.data.list_groups;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getLevelOption = createAsyncThunk(GET_LEVEL_OPTION, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(GET_LEVEL_OPTION);
      return response.data.data.list_levels;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getLevelList = createAsyncThunk(GET_LEVEL_LIST, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.get(GET_LEVEL_LIST);
      return response.data.data.list_levels;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});

export const getUserList = createAsyncThunk(GET_USER_LIST, async (data, { rejectWithValue }) => {
   try {
      const response = await apiAuth.post(GET_USER_LIST, data);
      return response.data.data;
   } catch (err) {
      return rejectWithValue(err.message);
   }
});
