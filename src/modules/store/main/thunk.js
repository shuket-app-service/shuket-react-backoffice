import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";
import routesConfig from "../../../@crema/core/AppRoutes/routeConfig";
import { remakeMenuLevel1 } from "../helper";

const LEFT_MEMU_BAR = "/main/get_left_menu_bar";
const GET_CITY_OPTIONS = "/main/get_city_options";
const GET_DISTRICT_OPTIONS = "/main/get_district_options?ct_code="
const GET_SALES_TEAM_OPTION = "/main/get_partner_sales_team_options?sp_code="



export const getSalesTeamOption = createAsyncThunk(
  GET_SALES_TEAM_OPTION,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_SALES_TEAM_OPTION + data);
      return response.data.data.list_sales_team;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const getLeftMenuBar = createAsyncThunk(
  LEFT_MEMU_BAR,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(LEFT_MEMU_BAR);
      let leftMenu = response.data.data.left_menu;
      leftMenu = await leftMenu.map((menu) => {
        return remakeMenuLevel1(menu)
      });
      return leftMenu.concat(routesConfig);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const getCityOptions = createAsyncThunk(
  GET_CITY_OPTIONS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_CITY_OPTIONS);
      return response.data.data.list_cities;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



export const getDistrictOptions = createAsyncThunk(
  GET_DISTRICT_OPTIONS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(GET_DISTRICT_OPTIONS + data);
      return response.data.data.list_districts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
