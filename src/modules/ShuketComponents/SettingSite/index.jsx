import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getSettingSite } from "../../store/settingSite/thunk";
import { initialStateFilter } from "./helper/state";
import SettingSiteTable from "./SettingSiteTable";
import SettingSiteEditModal from "./SettingSiteEditModal";

export default function SettingSite() {
   const { locale } = useLocaleContext();
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const [dataEdit, setDataOpen] = useState(null); // setting modal

   const handleOpenEdit = (value) => { // open, close setting modal
      setDataOpen(value)
   }

   async function fetchData(params) {
      const response = await dispatch(getSettingSite(params));
      setRows(response.payload?.list_data); // data
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

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <SettingSiteEditModal dataEdit={dataEdit} handleOpenEdit={handleOpenEdit} locale={locale}></SettingSiteEditModal>
               <SettingSiteTable rows={rows} dataFilter={dataFilter} pageCount={pageCount} searchCount={searchCount} handleChangePage={handleChangePage} handleOpenEdit={handleOpenEdit} locale={locale}></SettingSiteTable>
            </Box>
         )}
      </>
   );
}
