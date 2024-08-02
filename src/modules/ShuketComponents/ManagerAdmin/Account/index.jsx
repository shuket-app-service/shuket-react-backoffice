import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getGroupOption, getLevelOption, getUserList } from "../../../store/managerAdmin/thunk";
import ManagerAdminAccountTable from "./ManagerAdminAccountTable";
import ManagerAdminAccountFilter from "./ManagerAdminAccountFilter";
import { initialStateFilter } from "../helper/state";

export default function ManagerAdminAccount() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(false);
   const [rows, setRows] = useState([]);
   const [levels, setLevels] = useState([]);
   const [groups, setGroups] = useState([]);
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count

   const dispatch = useDispatch();

   async function fetchData(params) {
      setLoading(true);
      const resUser = await dispatch(getUserList(params));
      setRows(resUser.payload?.rows_users); // data
      setPageCount(resUser.payload?.page_count);
      setSearchCount(resUser.payload?.search_count);

      const resLevel = await dispatch(getLevelOption());
      setLevels(resLevel?.payload); // data

      const resGroup = await dispatch(getGroupOption());
      setGroups(resGroup?.payload); // data

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
      setDataFilter({ ...dataFilter, page: value });
      fetchData({ ...dataFilter, page: value });
   };

   const changeDataFilter = (value) => {
      setDataFilter(value);
   };

   const handleSearch = () => {
      fetchData(dataFilter);
   };
   const handleReset = () => {
      changeDataFilter(initialStateFilter);
      fetchData(initialStateFilter);
   };

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <ManagerAdminAccountFilter
                  dataFilter={dataFilter}
                  levels={levels}
                  groups={groups}
                  handleSearch={handleSearch}
                  handleReset={handleReset}
                  changeDataFilter={changeDataFilter}
                  locale={locale}
               ></ManagerAdminAccountFilter>
               <ManagerAdminAccountTable
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  locale={locale}
               ></ManagerAdminAccountTable>
            </Box>
         )}
      </>
   );
}
