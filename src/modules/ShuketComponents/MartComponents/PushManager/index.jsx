import { Box, Button, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialStateFilter } from "./helper/state";
import { getPushDetail, getPushList } from "../../../store/appPush/thunk";
import PushManagerTable from "./PushManagerTable";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import PushManagerFilter from "./PushManagerFilter";
import AppLoader from "@crema/components/AppLoader";
import PushManagerDetail from "./PushManagerDetail";
import BackdropLoad from "../../Common/BackdropLoad";

const PushManager = () => {
   const { locale } = useLocaleContext();
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(true);
   const [backdropLoading, setBackdropLoading] = useState(false);

   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);
   const [dataDetail, setDataDetail] = useState(null);

   async function fetchData(params) {
      const response = await dispatch(getPushList(params));
      setRows(response.payload?.list_data); // data
   
      setPageCount(Math.ceil(response.payload?.total_list_cnt / response.payload?.cur_per_page));
      setSearchCount(response.payload?.total_list_cnt);

      setLoading(false);
   }

   async function fetchDataDetail(code) {
      // setBackdropLoading(true);

      const response = await dispatch(getPushDetail(code));
      setDataDetail(response.payload); // data

      // setBackdropLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   
   const handleSearch = () => {
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
      fetchData(value);
   };

   const handleViewDetail = (code) => {
      fetchDataDetail(code);
   };

   const handleCloseDetail = () => {
      setDataDetail(null);
   };
   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               {backdropLoading ? (
                  <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>
               ) : (
                  <>
                     <PushManagerFilter dataFilter={dataFilter} changeDataFilter={changeDataFilter} handleSearch={handleSearch} locale={locale}></PushManagerFilter>
                     {dataDetail && <PushManagerDetail dataDetail={dataDetail} handleCloseDetail={handleCloseDetail} />}
                     <PushManagerTable
                        rows={rows}
                        dataFilter={dataFilter}
                        changeDataFilterDirectly={changeDataFilterDirectly}
                        pageCount={pageCount}
                        searchCount={searchCount}
                        handleChangePage={handleChangePage}
                        handleViewDetail={handleViewDetail}
                        handleSelect={() => {}}
                        locale={locale}
                        isModal={false}
                     ></PushManagerTable>
                  </>
               )}
            </Box>
         )}
      </>
   );
};

export default PushManager;
