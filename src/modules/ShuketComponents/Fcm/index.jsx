import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getSettingSite } from "../../store/settingSite/thunk";
import { initialStateFilter } from "./helper/state";
import FcmTable from "./FcmTable";
import { getFcmList } from "../../store/fcm/thunk";
import { useLocation } from "react-router-dom";

export default function Fcm() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);
   const location = useLocation()

   const dispatch = useDispatch();

   async function fetchData(params) {
      const response = await dispatch(getFcmList(params));
      setRows(response.payload?.fcm_list); // data
      if (response.payload?.cur_page != 1) {
         setDataFilter({ per_page: response.payload?.cur_per_page, page: response.payload?.cur_page });
      }
      setPageCount(Math.ceil(response.payload?.total_list_cnt / response.payload?.cur_per_page));
      setSearchCount(response.payload?.total_list_cnt);

      setLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   const handleChangePage = (event, value) => {
      setDataFilter({ per_page: dataFilter.per_page, page: value });
      fetchData({ per_page: dataFilter.per_page, page: value });
   };

   console.log(location)
   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <FcmTable rows={rows} dataFilter={dataFilter} pageCount={pageCount} searchCount={searchCount} handleChangePage={handleChangePage} locale={locale}></FcmTable>
            </Box>
         )}
      </>
   );
}
