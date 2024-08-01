import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getAppNoticeList } from "../../../store/notice/thunk";
import NoticeAdminTable from "./NoticeAppTable";
import { initialStateFilterApp } from "../helper/state";
import NoticeAdminFilter from "./NoticeAppFilter";

export default function NoticeApp() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(false);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilterApp);

   const dispatch = useDispatch();

   async function fetchData(params) {
      setLoading(true);
      const response = await dispatch(getAppNoticeList(params));
      setRows(response.payload?.list_notice); // data
      if (response.payload?.page_index != 1) {
         setDataFilter({ limit: response.payload?.page_size, page: response.payload?.page_index });
      }
      setPageCount(Math.ceil(response.payload?.search_count / response.payload?.page_size));
      setSearchCount(response.payload?.search_count);

      setLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   const changeDataFilter = (value) => {
      setDataFilter(value);
   };

   //call API directly when change
   const changeDataFilterDirectly = (value) => {
      setDataFilter(value);
      fetchData(value)
   }

   const handleChangePage = (event, value) => {
      setDataFilter({ limit: dataFilter.limit, page: value });
      fetchData({ limit: dataFilter.limit, page: value });
   };

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <NoticeAdminFilter dataFilter={dataFilter} changeDataFilter={changeDataFilter} locale={locale}></NoticeAdminFilter>
               <NoticeAdminTable rows={rows} dataFilter={dataFilter} changeDataFilterDirectly={changeDataFilterDirectly} pageCount={pageCount} searchCount={searchCount} handleChangePage={handleChangePage} locale={locale}></NoticeAdminTable>
            </Box>
         )}
      </>
   );
}
