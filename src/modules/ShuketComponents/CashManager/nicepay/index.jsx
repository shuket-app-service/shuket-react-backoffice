import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import NicepayTable from "./NicepayTable";
import NicepayFilter from "./NicepayFilter";
import { initialStateFilter } from "./helper/state";
import NicepayChart from "./NicepayChart";
import { getOrderListCashback } from "../../../store/cashbackManager/thunk";

export default function CashManagerNicepay() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const dispatch = useDispatch();

   async function fetchData(params) {
      const response = await dispatch(getOrderListCashback(params));
      setRows(response.payload?.list_data); // data

      setPageCount(Math.ceil(response.payload?.total_list_cnt / response.payload?.cur_per_page));
      setSearchCount(response.payload?.total_list_cnt);

      setLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   //call API directly when change
   const changeDataFilterDirectly = (value) => {
      setDataFilter(value);
      fetchData(value);
   };

   const handleChangePage = (event, value) => {
      setDataFilter({ per_page: dataFilter.per_page, page: value });
      fetchData({ per_page: dataFilter.per_page, page: value });
   };

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <NicepayFilter dataFilter={dataFilter} locale={locale}></NicepayFilter>
               <NicepayChart></NicepayChart>
               <NicepayTable
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  locale={locale}
               ></NicepayTable>
            </Box>
         )}
      </>
   );
}