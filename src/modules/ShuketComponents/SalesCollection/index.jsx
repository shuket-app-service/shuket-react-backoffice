import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SalesCollectionTable from "./salesCollectionTable";
import SalesCollectionFilter from "./salesCollectionFilter";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { getSalesCollectionList } from "../../store/salesCollection/thunk";

const initialState = {
  app_type: "",
  keyword_type: "mart_name",
  keyword_value: "",
  limit: 10,
  order_by: "newest",
  page: 1,
  status: "",
  mart_use_sync_order: false,
  mart_with_stock: false
}

export default function SalesCollection() {
    const [dataFilter, setDataFilter] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [pageCount, setPageCount] = useState(1); // page_count
    const [searchCount, setSearchCount] = useState(0) //search_count

    const dispatch = useDispatch()

    async function fetchData(params) {
      const response = await dispatch(getSalesCollectionList(params));
      setRows(response.payload.list_marts);
      if(response.payload.page_index != 1){
        setDataFilter({...dataFilter, page: response.payload.page_index})
      }
      setPageCount(response.payload.page_count)
      setSearchCount(response.payload.search_count)

      setLoading(false);
    }

    useEffect(() => {
      fetchData(dataFilter);
      return () => {};
    }, []);

    const changeDataFilter = (value) =>{
      setDataFilter(value)
    }

    const handleSearch = () =>{
      fetchData(dataFilter);
    }
    const handleReset = () =>{
      changeDataFilter(initialState)
      fetchData(initialState);
    }
    const handleChangePage = (event, value) =>{
      setDataFilter({...dataFilter, page: value})
      fetchData({...dataFilter, page: value});
    }

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <Box>
          <SalesCollectionFilter dataFilter={dataFilter} changeDataFilter={changeDataFilter} handleSearch={handleSearch} handleReset={handleReset}></SalesCollectionFilter>
          <SalesCollectionTable rows={rows} dataFilter={dataFilter} pageCount={pageCount} searchCount={searchCount} handleChangePage={handleChangePage}></SalesCollectionTable>
        </Box>
      )}
    </>
  );
}

