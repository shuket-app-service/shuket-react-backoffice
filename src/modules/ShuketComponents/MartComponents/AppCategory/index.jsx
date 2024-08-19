import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import AppCategoryTable from "./AppCategoryTable";
import AppCategoryFilter from "./AppCategoryFilter";
import { initialStateFilter } from "./helper/state";
import { getAppCategoryList } from "../../../store/appCategory/thunk";

export default function AppCategory() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const dispatch = useDispatch();

   async function fetchData(params) {
      if(!loading){
         setLoading(true);
      }
      const response = await dispatch(getAppCategoryList(params));
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
               <AppCategoryFilter dataFilter={dataFilter} changeDataFilterDirectly={changeDataFilterDirectly} locale={locale} ></AppCategoryFilter>
               <AppCategoryTable
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  locale={locale}
               ></AppCategoryTable>
            </Box>
         )}
      </>
   );
}
