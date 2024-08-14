import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import ManagerOrderFilter from "./ManagerOrderFilter";
import ManagerOrderTable from "./ManagerOrderTable";
import { getOrderMart } from "../../store/managerOrder/thunk";
import { initialStateFilter } from "./helper/state";
import BackdropLoad from "../Common/BackdropLoad";

export default function ManagerOrder() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [backdropLoading, setBackdropLoading] = useState(false);

   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const dispatch = useDispatch();

   async function fetchData(params) {
      const response = await dispatch(getOrderMart(params));
      setRows(response.payload?.list_data); // data
      if (response.payload?.cur_page != 1) {
         setDataFilter({ per_page: response.payload?.cur_per_page, page: response.payload?.cur_page });
      }
      setPageCount(Math.ceil(response.payload?.total_list_cnt / response.payload?.cur_per_page));
      setSearchCount(response.payload?.total_list_cnt);

      setLoading(false);
      setBackdropLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   const handleSearch = () => {
      setBackdropLoading(true);
      fetchData(dataFilter);
   };

   //call API directly when change
   const changeDataFilterDirectly = (value) => {
      setDataFilter(value);
      fetchData(value);
   };

   const handleChangePage = (event, value) => {
      setDataFilter({ ...dataFilter, page: value });
      fetchData({ ...dataFilter, page: value });
   };

   const changeDataFilter = (value) => {
      setDataFilter(value);
   };

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <ManagerOrderFilter dataFilter={dataFilter} changeDataFilter={changeDataFilter} handleSearch={handleSearch} locale={locale}></ManagerOrderFilter>

               {backdropLoading ? (
                  <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>
               ) : (
                  <ManagerOrderTable
                     rows={rows}
                     dataFilter={dataFilter}
                     changeDataFilterDirectly={changeDataFilterDirectly}
                     pageCount={pageCount}
                     searchCount={searchCount}
                     handleChangePage={handleChangePage}
                     locale={locale}
                  ></ManagerOrderTable>
               )}
            </Box>
         )}
      </>
   );
}
