import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import ManagerOrderFilter from "./ManagerOrderFilter";
import ManagerOrderTable from "./ManagerOrderTable";
import { initialStateFilter } from "./helper/state";
import BackdropLoad from "../../Common/BackdropLoad";
import { getOrderOwnMart } from "../../../store/managerOrder/thunk";
import { useSelector } from "react-redux";
import ManagerOrderTableGroup from "./ManagerOrderTableGroup";

export default function ManagerOrderMart() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [backdropLoading, setBackdropLoading] = useState(false);
   const user = useSelector((state) => state.auth.user);

   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const dispatch = useDispatch();

   async function fetchData(params) {
      const response = await dispatch(getOrderOwnMart(params));
      console.log("response", response)
      setRows(response.payload?.list_data); // data
      setPageCount(Math.ceil(response.payload?.total_list_cnt / response.payload?.cur_per_page));
      setSearchCount(response.payload?.total_list_cnt);

      setLoading(false);
      setBackdropLoading(false);
   }

   useEffect(() => {
      fetchData({...dataFilter, search_mart: user?.martid});
      return () => {};
   }, []);

   const handleSearch = () => {
      setBackdropLoading(true);
      fetchData(dataFilter);
   };

   //call API directly when change
   const changeDataFilterDirectly = (value) => {
      setDataFilter(value);
      setBackdropLoading(true);
      fetchData(value);
   };

   const handleChangePage = (event, value) => {
      setDataFilter({ ...dataFilter, page: parseInt(value) });
      setBackdropLoading(true);
      fetchData({ ...dataFilter, page: parseInt(value) });
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
                  !Array.isArray(rows) ?(
                     <ManagerOrderTableGroup
                     rows={rows}
                     dataFilter={dataFilter}
                     changeDataFilterDirectly={changeDataFilterDirectly}
                     pageCount={pageCount}
                     searchCount={searchCount}
                     handleChangePage={handleChangePage}
                     locale={locale}
                  ></ManagerOrderTableGroup>
                  ):(
                     <ManagerOrderTable
                     rows={rows}
                     dataFilter={dataFilter}
                     changeDataFilterDirectly={changeDataFilterDirectly}
                     pageCount={pageCount}
                     searchCount={searchCount}
                     handleChangePage={handleChangePage}
                     locale={locale}
                  ></ManagerOrderTable>
                  )
                
               )}
            </Box>
         )}
      </>
   );
}
