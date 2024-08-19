import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import DeliveryAreaTable from "./DeliveryAreaTable";
import DeliveryAreaFilter from "./DeliveryAreaFilter";
import { initialStateFilter } from "./helper/state";
import { getDeliveryAddress } from "../../../../store/deliveryManager/thunk";
import DelvieryAreaKakao from "./DelvieryAreaKakao";
import DeliveryAreaJuso from "./DeliveryAreaJuso";

export default function DeliveryArea() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const [openKakao, setOpenKakao] = useState(false);
   const [openJuso, setOpenJuso] = useState(false);


   const dispatch = useDispatch();

   async function fetchData(params) {
      if(!loading){
         setLoading(true);
      }
      const response = await dispatch(getDeliveryAddress(params));
      setRows(response.payload?.address_list); // data

      setPageCount(Math.ceil(response.payload?.page_count / response.payload?.page_size));
      setSearchCount(response.payload?.search_count);

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

   const handleOpenKakao = () =>{
      setOpenKakao(true)
   }

   const handleOpenJuso = () =>{
      setOpenJuso(true)
   }

   const handleCloseKakao = () =>{
      setOpenKakao(false)
   }

   const handleCloseJuso = () =>{
      setOpenJuso(false)
   }
   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <DeliveryAreaFilter dataFilter={dataFilter} changeDataFilterDirectly={changeDataFilterDirectly} handleOpenKakao={handleOpenKakao} handleOpenJuso={handleOpenJuso} locale={locale} ></DeliveryAreaFilter>
              
               <DelvieryAreaKakao openKakao={openKakao} handleCloseKakao={handleCloseKakao} locale={locale}></DelvieryAreaKakao>
               <DeliveryAreaJuso openJuso={openJuso} handleCloseJuso={handleCloseJuso} locale={locale}></DeliveryAreaJuso>
               
               <DeliveryAreaTable
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  locale={locale}
               ></DeliveryAreaTable>
            </Box>
         )}
      </>
   );
}
