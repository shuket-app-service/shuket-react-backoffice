import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import ManagerImageTableWithBarcode from "./ManagerImageTableWithBarcode";
import ManagerImageFilterWithBarcode from "./ManagerImageFilterWithBarcode";
import { getImageWithBarcode } from "../../../store/managerImage/thunk";
import { initialStateFilterWithBarcode } from "../Helper/state";

export default function ManagerImageWithBarcode() {
   const { locale } = useLocaleContext();
   const [dataFilter, setDataFilter] = useState(initialStateFilterWithBarcode);
   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);

   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count

   const dispatch = useDispatch();

   async function fetchData(params) {
      const response = await dispatch(getImageWithBarcode(params));
      setRows(response.payload.list_img);
      if (response.payload.cur_page != 1) {
         setDataFilter({ ...dataFilter, page: response.payload.cur_page });
      }
      setPageCount(response.payload.per_page);
      setSearchCount(response.payload.total);

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

   const handleSearch = () => {
      fetchData(dataFilter);
   };
   const handleReset = () => {
      changeDataFilter(initialState);
      fetchData(initialState);
   };
   const handleChangePage = (event, value) => {
      setDataFilter({ ...dataFilter, page: value });
      fetchData({ ...dataFilter, page: value });
   };

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <ManagerImageFilterWithBarcode
                  dataFilter={dataFilter}
                  changeDataFilter={changeDataFilter}
                  handleSearch={handleSearch}
                  handleReset={handleReset}
                  locale={locale}
               ></ManagerImageFilterWithBarcode>
               <ManagerImageTableWithBarcode
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  locale={locale}
               ></ManagerImageTableWithBarcode>
            </Box>
         )}
      </>
   );
}
