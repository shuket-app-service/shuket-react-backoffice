import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";
import routesConfig from "../../../@crema/core/AppRoutes/routeConfig";

const LEFT_MEMU_BAR = "/main/get_left_menu_bar";

const remakeMenuLevel1 = (object) =>{
  return {
    id: object.group_code,
    title: object.group_names.kr,
    messageId: "" + object.group_names.en.replaceAll(" ","_"),
    type: "group",
    children: object.hasOwnProperty('group_items') ?  object.group_items.map((menu) => {
      return remakeMenuLevel2(menu)
    }) : []
  };
}

const remakeMenuLevel2 = (object) =>{
  return {
    id: object.code,
    title: object.name.kr,
    messageId: "" + object.name.en.replaceAll(" ","_"),
    permittedRole: object.hasOwnProperty('sub_items') ? [] : ['admin','user'],
    type: object.hasOwnProperty('sub_items') ? "collapse" : "item",
    permittedRole:['admin','user'],
    icon: null,
    url: object.hasOwnProperty('sub_items') ? "" : object.route,
    children: object.hasOwnProperty('sub_items') ? object.sub_items.map((menu) => {
      return remakeMenuLevel3(menu)
    }) : []
  };
}

const remakeMenuLevel3 = (object) =>{
  return {
    id: object.code,
    title: object.name.kr,
    messageId: "" + object.name.en.replaceAll(" ","_"),
    type: "item",
    permittedRole:['admin','user'],
    url:  object.route,
  };
}


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


