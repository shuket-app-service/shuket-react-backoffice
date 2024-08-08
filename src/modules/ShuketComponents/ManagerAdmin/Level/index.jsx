import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getLevelList } from "../../../store/managerAdmin/thunk";
import ManagerAdminLevelTable from "./ManagerAdminLevelTable";
import ManagerAdminLevelPermission from "./ManagerAdminLevelPermission";

export default function ManagerAdminLevel() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(false);
   const [rows, setRows] = useState([]);
   const [dataOpen, setDataOpen] = useState(null); // CODE  

   const dispatch = useDispatch();

   const handleSetDataOpen = (value)=>{
      setDataOpen(value)
   }

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
               <ManagerAdminLevelPermission dataOpen={dataOpen} handleSetDataOpen={handleSetDataOpen} locale={locale} ></ManagerAdminLevelPermission>
               <ManagerAdminLevelTable rows={rows} locale={locale}  handleSetDataOpen={handleSetDataOpen}></ManagerAdminLevelTable>
            </Box>
         )}
      </>
   );
}
