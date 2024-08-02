import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getLevelList } from "../../../store/managerAdmin/thunk";
import ManagerAdminLevelTable from "./ManagerAdminLevelTable";

export default function ManagerAdminLevel() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(false);
   const [rows, setRows] = useState([]);

   const dispatch = useDispatch();

   async function fetchData() {
      setLoading(true);
      const response = await dispatch(getLevelList());
      setRows(response?.payload); // data
      setLoading(false);
   }

   useEffect(() => {
      fetchData();
      return () => {};
   }, []);


   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <ManagerAdminLevelTable rows={rows} locale={locale}></ManagerAdminLevelTable>
            </Box>
         )}
      </>
   );
}
