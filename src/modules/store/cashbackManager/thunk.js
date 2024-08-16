import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiAuth from "../../../@crema/services/axios/ApiConfig";


const GET_ORDER_LIST_CASHBACK = "/cashback/get_order_list";



export const getOrderListCashback = createAsyncThunk(GET_ORDER_LIST_CASHBACK, async ({cases, mart_code, page, per_page, search_keyword, search_type , search_sdate , search_edate, search_status  }, { rejectWithValue }) => {
    try {
    const response = await apiAuth.get(
        `${GET_ORDER_LIST_CASHBACK}?case=${cases}&mart_code=${mart_code}&page=${page}&per_page=${per_page}&search_keyword=${search_keyword}&search_type=${search_type}&search_sdate=${search_sdate}&search_edate=${search_edate}&search_status=${search_status}`
    );
       return response.data.data;
    } catch (err) {
       return rejectWithValue(err.message);
    }
 });
 

