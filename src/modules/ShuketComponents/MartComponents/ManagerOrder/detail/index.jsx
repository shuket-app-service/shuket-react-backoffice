import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import ManagerOrderFilter from "./ManagerOrderFilter";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import ManagerOrderInfo from "./ManagerOrderInfo";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrderDetail } from "../../../store/managerOrder/thunk";
import AppLoader from "@crema/components/AppLoader";

const ManagerOrderDetail = () => {
   const { locale } = useLocaleContext();
   const [searchParams] = useSearchParams();
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   const [dataDetail, setDataDetail] = useState(null);

   async function fetchData(params) {
      const response = await dispatch(getOrderDetail(params));
      setDataDetail(response?.payload); // data
      setLoading(false);
   }

   useEffect(() => {
      fetchData({ ord_code: searchParams.get("ord_code"), mart_code: searchParams.get("mart_code") });
      return () => {};
   }, []);

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <ManagerOrderFilter dataDetail={dataDetail} locale={locale}></ManagerOrderFilter>
               <ManagerOrderInfo dataDetail={dataDetail} locale={locale}></ManagerOrderInfo>
            </Box>
         )}
      </>
   );
};

export default ManagerOrderDetail;
